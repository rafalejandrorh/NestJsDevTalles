import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductImage } from "./";
import { User } from "src/auth/entities/user.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({name: 'products'})
export class Product {

  @ApiProperty({
    example:'02493c19-ddc4-4f10-b42d-ad2d1aa6ba5f',
    description: 'Product ID',
    uniqueItems: true
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example:'T-shirt Teslo',
    description: 'Product Title',
    uniqueItems: true
  })
  @Column('text', {
    unique: true,
  })
  title: string;

  @ApiProperty({
    example:'Eiusmod nostrud velit ipsum sint voluptate dolore enim voluptate.',
    description: 'Product Description'
  })
  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @ApiProperty({
    example:0.00,
    description: 'Product Price'
  })
  @Column('float', {
    default: 0,
  })
  price: number;

  @ApiProperty({
    example:'t_shirt_teslo',
    description: 'Product Slug',
    uniqueItems: true
  })
  @Column('text', {
    unique: true,
  })
  slug: string;

  @ApiProperty({
    example:15,
    description: 'Product Stock'
  })
  @Column('int', {
    default: 0,
  })
  stock: number;

  @ApiProperty({
    example:[
      'XS',
      'S',
      'M',
      'L',
      'XL',
      'XXL'
    ],
    description: 'Product Sizes'
  })
  @Column('text', {
    array: true,
    default: [],
  })
  sizes: string[];

  @ApiProperty({
    example:'W',
    description: 'Product Gender'
  })
  @Column('text')
  gender: string; // M | W | Unisex

  @ApiProperty({
    example:[
      'Shirt´s',
      'Teslo'
    ],
    description: 'Product Tags'
  })
  @Column('text', {
    array: true,
    default: [],
  })
  tags: string[];

  // Images
  @ApiProperty({
    example:[
      "8764734-00-A_0_2000.jpg",
      "8764734-00-A_1.jpg"
    ],
    description: 'Product Images'
  })
  @OneToMany(
    () => ProductImage,
    (productImage) => productImage.product,
    { cascade: true, eager: true }
  )
  images: ProductImage[];

  // Users
  @ApiProperty()
  @ManyToOne(
    () => User,
    (user) => user.product,
    { eager: true }
  )
  user: User
  
  @BeforeInsert()
  checkSlugInsert() {
    if(!this.slug) {
      this.slug = this.title;
    }
    this.slug = this.slug.replaceAll(' ', '_').replaceAll("'",'').toLowerCase();
  }

  @BeforeUpdate()
  checkSlugUpdate() {
    if(!this.slug) {
      this.slug = this.title;
    }
    this.slug = this.slug.replaceAll(' ', '_').replaceAll("'",'').toLowerCase();
  }

}
