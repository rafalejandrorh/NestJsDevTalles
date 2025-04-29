import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {

  private readonly logger = new Logger('ProductsService');

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    
    try {
      
      // For this validation, we are going to use a method that is going to be called before the insert
      // in the entity. This method is going to check if the slug is empty and if it is, it is going to create it.
      // if(!createProductDto.slug) {
      //   createProductDto.slug = createProductDto.title.replaceAll(' ', '_').replaceAll("'",'').toLowerCase();
      // } else {
      //   createProductDto.slug = createProductDto.slug.replaceAll(' ', '_').replaceAll("'",'').toLowerCase();
      // }

      const product = this.productRepository.create(createProductDto);
      await this.productRepository.save(product);
      return product;

    } catch (error) {
      this.handleException(error);
    }

  }

  findAll() {
    return this.productRepository.find();
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOneBy({id});
    if(!product) throw new NotFoundException(`Product with id ${id} not found`);
    return product;
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  async remove(id: string) {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
  }

  private handleException(error: any) {
    if(error.code === '23505') {
      this.logger.warn('Product already exists', error.detail);
      throw new BadRequestException('Product already exists');
    }

    this.logger.error(error);
    throw new InternalServerErrorException('Internal Server Exception');
  }

}
