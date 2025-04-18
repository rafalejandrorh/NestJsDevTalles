import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { PokemonService } from 'src/pokemon/pokemon.service';

@Injectable()
export class SeedService {

  private readonly axios: AxiosInstance = axios;

  constructor(private readonly PokemonService: PokemonService) {}

  async executeSeed() {
    const { data } = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=10');

    data.results.forEach(({name, url}) => {
      const segments = url.split('/');
      const id = segments[segments.length - 2];
      console.log({ id, name });

      this.PokemonService.create({
        name,
        no: +id
      });
      
    });

    return data.results;
  }

}
