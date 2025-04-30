import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { ConfigService } from '@nestjs/config';
import { isUUID } from 'class-validator';
import { ProductImage } from './entities';

@Injectable()
export class ProductsService {

  private readonly logger = new Logger('ProductsService');
  private defaultLimit: number;
  private defaultOffset: number;

  constructor(
    private readonly configService: ConfigService,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(ProductImage)
    private readonly productImageRepository: Repository<ProductImage>,
  ) {
    this.defaultLimit = configService.getOrThrow<number>('pagination.limit');
    this.defaultOffset = this.configService.getOrThrow<number>('pagination.offset');
  }

  async create(createProductDto: CreateProductDto) {
    
    try {

      const { images = [], ...productDetails } = createProductDto;
      const product = this.productRepository.create({
        ...productDetails,
        images: images.map(image => this.productImageRepository.create({ url: image })),
      });
      await this.productRepository.save(product);
      return {...product, images: images};

    } catch (error) {
      this.handleException(error);
    }

  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = this.defaultLimit, offset = this.defaultOffset } = paginationDto;
    const products = await this.productRepository.find({
      take: limit,
      skip: offset,
      relations: {
        images: true
      },
    });

    return products.map(product => ({
      ...product,
      images: product.images.map(image => image.url)
    }));
  }

  async findOne(term: string) {

    let product: Product |null = null;

    if(isUUID(term)) {
      product = await this.productRepository.findOneBy({id:term});
    } else {  
      const queryBuilder = this.productRepository.createQueryBuilder('product');
      product = await queryBuilder.where(`UPPER(title) =:title or slug =:slug`, {
        title: term.toUpperCase(),
        slug: term.toLowerCase()
      }).getOne();
    }

    if(!product) throw new NotFoundException(`Product with ${term} not found`);
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {

    try {
      const product = await this.productRepository.preload({
        id: id,
        ...updateProductDto,
        images: []
      });
  
      if(!product) throw new NotFoundException(`Product with id ${id} not found`);
      return await this.productRepository.save(product);
    } catch (error) {
      this.handleException(error);
    }

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
