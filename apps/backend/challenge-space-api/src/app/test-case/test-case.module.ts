import { Module } from '@nestjs/common';
import { TestCaseService } from './test-case.service';
import { TestCaseController } from './test-case.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {TestCaseEntity} from './entities/test-case.entity';
import {TaskEntity} from '../task/entities/task.entity';

@Module({
    controllers: [TestCaseController],
    providers: [TestCaseService],
    exports: [TestCaseService],
    imports: [TypeOrmModule.forFeature([TaskEntity, TestCaseEntity])],
})
export class TestCaseModule {}
