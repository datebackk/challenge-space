import {Module} from '@nestjs/common';
import {ContestService} from './contest.service';
import {ContestController} from './contest.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {TaskEntity} from '../task/entities/task.entity';
import {ContestEntity} from './entities/contest.entity';
import {TestCaseEntity} from '../test-case/entities/test-case.entity';
import {UserModule} from '../user/user.module';
import {SolutionEntity} from '../solution/entities/solution.entity';

@Module({
    controllers: [ContestController],
    providers: [ContestService],
    imports: [
        TypeOrmModule.forFeature([ContestEntity, TaskEntity, TestCaseEntity, SolutionEntity]),
        UserModule,
    ],
    exports: [ContestService]
})
export class ContestModule {}
