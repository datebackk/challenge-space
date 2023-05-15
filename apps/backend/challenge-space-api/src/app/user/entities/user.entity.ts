import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import type {IUser} from '../interfaces/user.interface';
import {ContestEntity} from '../../contest/entities/contest.entity';

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
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;

    @OneToMany(() => ContestEntity, contest => contest.user)
    contests: ContestEntity[];
}
