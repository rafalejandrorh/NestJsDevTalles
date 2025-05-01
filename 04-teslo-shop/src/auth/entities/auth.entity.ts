import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true,
    })
    email: string;

    @Column('text')
    password: string;

    @Column('text', {
        default: 'user',
    })
    fullName: string;

    @Column('bool', {
        default: false,
    })
    isActive: boolean;

    @Column('text', {
        array: true,
        default: ['user'],
    })
    role: string[];
}
