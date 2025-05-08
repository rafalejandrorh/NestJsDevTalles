import { Injectable } from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';
import { initialData } from './data/seed-data';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';
// import axios, { AxiosInstance } from 'axios';
// import { PokeResponse } from './interfaces/poke-response.interface';
// import { AxiosAdapter } from 'src/common/adapters/axios.adapters';

@Injectable()
export class SeedService {

  constructor(
    private readonly productsServices: ProductsService,
    
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async executeSeed() {

    await this.deleteTables();
    const adminUser = await this.insertUsers();
    await this.insertNewProducts(adminUser);
    return 'Seed Executed';

  }

  private async deleteTables() {

    await this.productsServices.deleteAllProducts();
    const queryBuilder = this.userRepository.createQueryBuilder();
    await queryBuilder.delete().where({}).execute();

  }

  private async insertUsers() {

    const seedUsers = initialData.users;
    const users: User[] = [];
    seedUsers.forEach( user => {
      users.push(this.userRepository.create(user));
    });
    const dbUsers = await this.userRepository.save(seedUsers);
    return dbUsers[0];

  }

  private async insertNewProducts(user: User) {

    const seedProducts = initialData.products;
    const insertPromises: Promise<any>[] = [];
    seedProducts.forEach(product => {
      insertPromises.push(this.productsServices.create(product, user));
    });
    await Promise.all(insertPromises);
    return true;

  }

}
