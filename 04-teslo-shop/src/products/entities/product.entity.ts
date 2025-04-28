import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true,
    })
    title: string;

    @Column({
        type: 'text',
        nullable: true,
    })
    description: string;

    @Column('float', {
        default: 0,
    })
    price: number;

    @Column('text', {
        unique: true,
    })
    slug: string;

    @Column('int', {
        default: 0,
    })
    stock: number;

    @Column('text', {
        array: true,
        default: [],
    })
    sizes: string[];

    @Column('text')
    gender: string; // M | W | Unisex

    // Tags and Images

    @BeforeInsert()
    checkSlugInsert() {
      if(!this.slug) {
        this.slug = this.title;
      }
      this.slug = this.slug.replaceAll(' ', '_').replaceAll("'",'').toLowerCase();
    }

}
