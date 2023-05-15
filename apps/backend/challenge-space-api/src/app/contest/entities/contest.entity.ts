import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne, OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import type {IContest} from '../interfaces/contest.interface';
import {UserEntity} from '../../user/entities/user.entity';
import {TaskEntity} from '../../task/entities/task.entity';

@Entity({
    name: 'contests',
})
export class ContestEntity implements IContest {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column({type: 'timestamptz'})
    startDate: Date;

    @Column({type: 'timestamptz'})
    endDate: Date;

    @Column()
    duration: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => UserEntity, user => user.contests)
    user: UserEntity;

    @OneToMany(() => TaskEntity, task => task.contest)
    tasks: TaskEntity[]
}
