import {forwardRef, Module} from '@nestjs/common';
import { SolutionService } from './solution.service';
import { SolutionController } from './solution.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {SolutionEntity} from './entities/solution.entity';
import {ContestEntity} from '../contest/entities/contest.entity';
import {UserModule} from '../user/user.module';
import {ContestModule} from '../contest/contest.module';
import {Judge0Service} from './judge0.service';
import {HttpModule} from '@nestjs/axios';
import {TokenModule} from '../token/token.module';
import {TaskModule} from '../task/task.module';
import {TestCaseModule} from '../test-case/test-case.module';

@Module({
    controllers: [SolutionController],
    providers: [SolutionService, Judge0Service],
    exports: [SolutionService],
    imports: [
        TypeOrmModule.forFeature([SolutionEntity, ContestEntity]),
        forwardRef(() => TokenModule),
        HttpModule,
        UserModule,
        ContestModule,
        TaskModule,
        TestCaseModule,
    ],
})
export class SolutionModule {}
