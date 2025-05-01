import { Injectable } from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';
import { initialData } from './data/seed-data';
// import axios, { AxiosInstance } from 'axios';
// import { PokeResponse } from './interfaces/poke-response.interface';
// import { AxiosAdapter } from 'src/common/adapters/axios.adapters';

@Injectable()
export class SeedService {

  constructor(
    private readonly productsServices: ProductsService,
  ) {}

  async executeSeed() {

    await this.insertNewProducts();

    return 'Seed Executed';
  }

  private async insertNewProducts() {
    await this.productsServices.deleteAllProducts();

    const products = initialData.products;
    const insertPromises: Promise<any>[] = [];
    products.forEach(product => {
      insertPromises.push(this.productsServices.create(product));
    });

    await Promise.all(insertPromises);

    return true;
  }

}
