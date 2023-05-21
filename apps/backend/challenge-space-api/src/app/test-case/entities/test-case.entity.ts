import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {ITestCase} from '../interfaces/test-case.interface';
import {TaskEntity} from '../../task/entities/task.entity';
import {TokenEntity} from '../../token/entities/token.entity';

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

    @OneToMany(() => TokenEntity, token => token.testCase)
    tokens: TokenEntity[];

    @ManyToOne(() => TaskEntity, task => task.testCases)
    task: TaskEntity;
}
