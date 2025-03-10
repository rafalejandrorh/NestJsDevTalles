import axios from 'axios';

export class Pokemon {
    
    get imageUrl(): string {
        return `https://pokemon.com/${ this.id }.jpg`;
    }

    constructor(    
        public readonly id: number,
        public name: string) {}

    scream() {
        console.log(`${ this.name.toUpperCase() }!!!`);
    }

    speak() {
        console.log(`${ this.name }, ${ this.name }`);
    }

    async getMoves() {
        //return 10;
        const response = await axios.get<string>('http://pokeapi.co/api/v2/pokemon/4');
        return response;
    }
}

export const Charmander = new Pokemon(4, 'Charmander');

