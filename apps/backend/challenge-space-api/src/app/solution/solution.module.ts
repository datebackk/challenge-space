import { Module } from '@nestjs/common';
import { SolutionService } from './solution.service';
import { SolutionController } from './solution.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {SolutionEntity} from './entities/solution.entity';
import {ContestEntity} from '../contest/entities/contest.entity';
import {UserModule} from '../user/user.module';
import {ContestModule} from '../contest/contest.module';

@Module({
    controllers: [SolutionController],
    providers: [SolutionService],
    imports: [
        TypeOrmModule.forFeature([SolutionEntity, ContestEntity]),
        UserModule,
        ContestModule,
    ],
})
export class SolutionModule {}
