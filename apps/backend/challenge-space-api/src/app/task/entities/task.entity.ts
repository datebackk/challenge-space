import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {ITask} from '../interfaces/task.interface';
import {ContestEntity} from '../../contest/entities/contest.entity';
import {TestCaseEntity} from '../../test-case/entities/test-case.entity';

@Entity({
    name: 'tasks',
})
export class TaskEntity implements ITask {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @Column()
    name: string;

    @ManyToOne(() => ContestEntity, contest=> contest.tasks)
    contest: ContestEntity;

    @OneToMany(() => TestCaseEntity, testCase => testCase.task, {cascade: true})
    testCases: TestCaseEntity[];
}
