import {forwardRef, Module} from '@nestjs/common';
import {ContestService} from './contest.service';
import {ContestController} from './contest.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {TaskEntity} from '../task/entities/task.entity';
import {ContestEntity} from './entities/contest.entity';
import {TestCaseEntity} from '../test-case/entities/test-case.entity';
import {UserModule} from '../user/user.module';
import {SolutionEntity} from '../solution/entities/solution.entity';
import {SolutionModule} from '../solution/solution.module';
import {TokenModule} from '../token/token.module';

@Module({
    controllers: [ContestController],
    providers: [ContestService],
    imports: [
        TypeOrmModule.forFeature([ContestEntity, TaskEntity, TestCaseEntity, SolutionEntity]),
        forwardRef(() => SolutionModule),
        forwardRef(() => TokenModule),
        UserModule,
    ],
    exports: [ContestService]
})
export class ContestModule {}
