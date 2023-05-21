import {Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {TestCaseEntity} from '../../test-case/entities/test-case.entity';
import {SolutionEntity} from '../../solution/entities/solution.entity';
import {TaskEntity} from '../../task/entities/task.entity';

@Entity({
    name: 'tokens'
})
export class TokenEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => SolutionEntity, solution => solution.tokens)
    solution: SolutionEntity;

    @ManyToOne(() => TaskEntity, task => task.tokens)
    task: SolutionEntity;

    @ManyToOne(() => TestCaseEntity, testCase => testCase.tokens)
    testCase: TestCaseEntity;
}
