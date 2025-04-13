import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PokemonService {
  
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase().trim(); // Normalize the name to lowercase and trim whitespace
    
    try {
      
      // This is normally done, but we are going to use the Mongo error code 11000 to handle this case 
      // const pokemonExists = await this.pokemonModel.findOne({ name: createPokemonDto.name });
      // if (pokemonExists) throw new ConflictException(`Pokemon with name ${createPokemonDto.name} already exists`);
  
      return await this.pokemonModel.create(createPokemonDto);

    } catch (error) {
      console.log(error);

      if(error.code === 11000) {
        throw new ConflictException(`Pokemon with name ${createPokemonDto.name} already exists`);
      }

      throw new InternalServerErrorException(`Can't create Pokemon`);
    }

  }

  findAll() {
    return `This action returns all pokemon`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pokemon`;
  }

  update(id: number, updatePokemonDto: UpdatePokemonDto) {
    return `This action updates a #${id} pokemon`;
  }

  remove(id: number) {
    return `This action removes a #${id} pokemon`;
  }
}
