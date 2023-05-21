import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {TaskEntity} from './entities/task.entity';
import {ContestEntity} from '../contest/entities/contest.entity';
import {TestCaseEntity} from '../test-case/entities/test-case.entity';

@Module({
    controllers: [TaskController],
    providers: [TaskService],
    exports: [TaskService],
    imports: [TypeOrmModule.forFeature([ContestEntity, TaskEntity, TestCaseEntity])],
})
export class TaskModule {}
