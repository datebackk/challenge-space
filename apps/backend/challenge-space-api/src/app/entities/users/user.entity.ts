import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import type {IUser} from './interfaces/user.interface';

@Entity({
    name: 'users',
})
export class UserEntity implements IUser {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true, nullable: true})
    email: string;

    @Column({unique: true})
    username: string;

    @CreateDateColumn()
    created: string;

    @UpdateDateColumn()
    updated: string;
}
