import {
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import type {IContest} from '../interfaces/contest.interface';
import {UserEntity} from '../../user/entities/user.entity';

@Entity({
    name: 'contests',
})
export class ContestEntity implements IContest {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => UserEntity, user => user.contests)
    user: UserEntity;

    name: string;
    description: string;
    startDate: string;
    endDate: string;
    duration: string;

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;
}
