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
import {SolutionEntity} from '../../solution/entities/solution.entity';
import {TokenEntity} from '../../token/entities/token.entity';

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
    duration: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => UserEntity, user => user.contests)
    user: UserEntity;

    @OneToMany(() => TokenEntity, token => token.contest, {cascade: true})
    tokens: TokenEntity[];

    @OneToMany(() => TaskEntity, task => task.contest, {cascade: true, eager: true})
    tasks: TaskEntity[];

    @OneToMany(() => SolutionEntity, solution => solution.contest)
    solutions: SolutionEntity[];
}
