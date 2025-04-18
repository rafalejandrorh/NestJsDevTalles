import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';
import { isValidObjectId, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ConfigService } from '@nestjs/config';
import { config } from 'process';

@Injectable()
export class PokemonService {
  
  private defaultLimit: number;
  private defaultOffset: number;

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly configService: ConfigService,
  ) {
    this.defaultLimit = configService.getOrThrow<number>('pagination.limit');
    this.defaultOffset = this.configService.getOrThrow<number>('pagination.offset');
  }

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase().trim(); // Normalize the name to lowercase and trim whitespace
    
    try {
      
      // This is normally done, but we are going to use the Mongo error code 11000 to handle this case 
      // const pokemonExists = await this.pokemonModel.findOne({ name: createPokemonDto.name });
      // if (pokemonExists) throw new ConflictException(`Pokemon with name ${createPokemonDto.name} already exists`);
  
      return await this.pokemonModel.create(createPokemonDto);

    } catch (error) {
      this.handleExceptions(error);
    }

  }

  findAll(paginationDto: PaginationDto) {
    const {limit = this.defaultLimit, offset = this.defaultOffset} = paginationDto;
    return this.pokemonModel.find().limit(limit).skip(offset).sort({ no: 1 }).select('-__v'); // -__v to exclude the __v field from the response
  }

  async findOne(term: string) {

    let pokemon: Pokemon | null = null;

    // Pokemon No (N°)
    if(!isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({ no: term });
    }

    // MongoID
    if(isValidObjectId(term)) {
      pokemon = await this.pokemonModel.findById(term);
    }

    // Pokemon Name
    if(!pokemon) {
      pokemon = await this.pokemonModel.findOne({ name: term.toLowerCase().trim() });
    }

    // Not Exists
    if(!pokemon) 
      throw new NotFoundException(`Pokemon with id, name or no "${term}" not found`);
    
    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    
    const pokemon = await this.findOne(term);
    if(updatePokemonDto.name) {
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase().trim(); // Normalize the name to lowercase and trim whitespace
    }

    try {
      await pokemon.updateOne(updatePokemonDto, { new: true });
      
      return { ...pokemon.toJSON(), ...updatePokemonDto };
    } catch (error) {
      this.handleExceptions(error);
    }

  }

  async remove(id: string) {
    return await this.pokemonModel.findByIdAndDelete(id);
  }

  private handleExceptions(error: any) {
    console.log(error);

    if(error.code === 11000) {
      throw new ConflictException(`Pokemon already exists: ${JSON.stringify(error.keyValue)}`);
    }

    throw new InternalServerErrorException(`Can't create Pokemon`);
  }

}
