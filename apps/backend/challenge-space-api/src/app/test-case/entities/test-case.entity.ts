import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {ITestCase} from '../interfaces/test-case.interface';
import {TaskEntity} from '../../task/entities/task.entity';

@Entity({
    name: 'test_cases'
})
export class TestCaseEntity implements ITestCase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    input: string;

    @Column()
    output: string;

    @ManyToOne(() => TaskEntity, task => task.testCases)
    task: TaskEntity;
}
