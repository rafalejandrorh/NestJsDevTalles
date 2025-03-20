import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { Car } from './interfaces/car.interface';
import { CreateCarDto, UpdateCarDto } from './dto/index';

@Injectable()
export class CarsService {

  private cars: Car[] = [];
  // private cars: Car[] = [
  //   {
  //       id: uuid(),
  //       brand: 'Toyota',
  //       model: 'Corolla'
  //   },
  //   {
  //       id: uuid(),
  //       brand: 'Honda',
  //       model: 'Civic'
  //   },
  //   {
  //       id: uuid(), 
  //       brand: 'Jeep',
  //       model: 'Cherokee'
  //   }
  // ];

  findAll() {
    return this.cars;
  }

  findOneById(id: string) {
    const car = this.cars.find((car) => car.id === id);
    if(!car) throw new NotFoundException(`Car with id '${id}' not found`);
    return car;
  }

  create( createCarDto: CreateCarDto) {
    const car: Car = {
        id: uuid(),
        ...createCarDto
        // brand: createCarDto.brand,
        // model: createCarDto.model
    };
    this.cars.push(car);
    return car;
  }

  update(id: string, updateCarDto: UpdateCarDto) {

    if(updateCarDto.id && updateCarDto.id !== id) throw new BadRequestException(`Car id is not valid inside body`);
    let carDB = this.findOneById(id);
    this.cars = this.cars.map(car => {
        if(car.id === id) {
          carDB = {...carDB, ...updateCarDto, id};
          return carDB;
        }
        return car;
    });
      
    return carDB;
  }

  delete(id: string) {
    this.findOneById(id);
    this.cars = this.cars.filter(car => car.id !== id);
  }
    
  fillCarsWithSeedData(cars: Car[]) {
    this.cars = cars;
  }
  
}
