import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
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

    private readonly dataSource: DataSource

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

    let product: Product | null = null;

    if(isUUID(term)) {
      product = await this.productRepository.findOneBy({id:term});
    } else {  
      const queryBuilder = this.productRepository.createQueryBuilder('product');
      product = await queryBuilder.where(`UPPER(title) =:title or slug =:slug`, {
        title: term.toUpperCase(),
        slug: term.toLowerCase()
      })
      .leftJoinAndSelect('product.images', 'images')
      .getOne();
    }

    if(!product) throw new NotFoundException(`Product with ${term} not found`);
    return product;
  }

  async findOnePlain(term: string) {
    const { images = [], ...rest } = await this.findOne(term);
    return {
      ...rest, 
      images: images.map(image => image.url)
    };
  }

  async update(id: string, updateProductDto: UpdateProductDto) {

    try {

      const { images, ...toUpdate } = updateProductDto;

      const product = await this.productRepository.preload({
        id: id,
        ...toUpdate
      });
      if(!product) throw new NotFoundException(`Product with id ${id} not found`);

      // Update images
      const queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();

      if(images) {
        await queryRunner.manager.delete(ProductImage, { product: { id } });
        product.images = images.map(
          image => this.productImageRepository.create({ url: image })
        );
      }

      await queryRunner.manager.save(product);
      await queryRunner.commitTransaction();
      await queryRunner.release();

      //return await this.productRepository.save(product);
      return product;

    } catch (error) {
      this.handleException(error);
    }

  }

  async remove(id: string) {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
  }

  async deleteAllProducts() {

    try {
      const query = this.productRepository.createQueryBuilder('product');
      return await query.delete().where({}).execute();
    } catch (error) {
      this.handleException(error);
    }
    
  }

  private handleException(error: any): never {
    if(error.code === '23505') {
      this.logger.warn('Product already exists', error.detail);
      throw new BadRequestException('Product already exists');
    }

    this.logger.error(error);
    throw new InternalServerErrorException('Internal Server Exception');
  }

}
