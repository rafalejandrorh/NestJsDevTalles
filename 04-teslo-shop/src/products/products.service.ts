import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ProductsService {

  private readonly logger = new Logger('ProductsService');
  private defaultLimit: number;
  private defaultOffset: number;

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {
    this.defaultLimit = configService.getOrThrow<number>('pagination.limit');
    this.defaultOffset = this.configService.getOrThrow<number>('pagination.offset');
  }

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

  findAll(paginationDto: PaginationDto) {

    const { limit = this.defaultLimit, offset = this.defaultOffset } = paginationDto;
    return this.productRepository.find({
      take: limit,
      skip: offset,
    });
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
