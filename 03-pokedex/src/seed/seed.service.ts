import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { CreatePokemonDto } from 'src/pokemon/dto/create-pokemon.dto';

@Injectable()
export class SeedService {

  private readonly axios: AxiosInstance = axios;

  constructor(
    @InjectModel(Pokemon.name)
    private readonly PokemonModel: Model<Pokemon>) {}

  async executeSeed() {

    //await this.PokemonModel.deleteMany({}); // Uncomment to clear the database before seeding

    const { data } = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');
    const pokemonToInsert: CreatePokemonDto[] = [];

    data.results.forEach(async ({name, url}) => {
      const segments = url.split('/');
      const id = segments[segments.length - 2];
      console.log({ id, name });
      pokemonToInsert.push({name, no: +id});
    });

    await this.PokemonModel.insertMany(pokemonToInsert).then(() => {
      console.log('Pokemons inserted successfully');
    }).catch((error) => {
      console.error('Error inserting pokemons:', error);
    });

    return 'Seed Executed';
  }

}
