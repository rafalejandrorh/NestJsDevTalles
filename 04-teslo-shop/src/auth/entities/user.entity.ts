import { ApiProperty } from "@nestjs/swagger";
import { Product } from "src/products/entities";
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {

  @ApiProperty({
    example: '02493c19-ddc4-4f10-b42d-ad2d1aa6ba5f',
    description: 'User ID',
    uniqueItems: true
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'test@gmail.com',
    description: 'User Email',
    uniqueItems: true
  })
  @Column('text', {
    unique: true,
  })
  email: string;

  @ApiProperty({
    example: 'Abc123',
    description: 'User Password',
  })
  @Column('text', {
    select: false, // This will not be selected by default when querying the user
  })
  password: string;

  @ApiProperty({
    default: 'user',
    example: 'Juan Perez',
    description: 'User Full name'
  })
  @Column('text', {
    default: 'user',
  })
  fullName: string;

  @ApiProperty({
    default: true,
    example: true,
    description: 'User Is Active',
  })
  @Column('bool', {
    default: true,
  })
  isActive: boolean;

  @ApiProperty({
    default: ['user'],
    example: ['user'],
    description: 'User Roles',
  })
  @Column('text', {
    array: true,
    default: ['user'],
  })
  role: string[];

  @OneToMany(
    () => Product,
    (product) => product.user
  )
  product: Product

  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.email = this.email.toLowerCase().trim();
    if(this.fullName) this.fullName = this.fullName.toLowerCase().trim();
  }

  @BeforeUpdate()
  checkFieldsBeforeUpdate() {
    this.checkFieldsBeforeInsert();
  }

}
