import {Module} from '@nestjs/common';
import {ContestService} from './contest.service';
import {ContestController} from './contest.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {TaskEntity} from '../task/entities/task.entity';
import {ContestEntity} from './entities/contest.entity';
import {TestCaseEntity} from '../test-case/entities/test-case.entity';

@Module({
    controllers: [ContestController],
    providers: [ContestService],
    imports: [TypeOrmModule.forFeature([ContestEntity, TaskEntity, TestCaseEntity])],
})
export class ContestModule {}
