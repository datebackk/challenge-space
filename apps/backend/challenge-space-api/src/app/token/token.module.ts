import {forwardRef, Module} from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {TokenEntity} from './entities/token.entity';
import {TaskModule} from '../task/task.module';
import {TestCaseModule} from '../test-case/test-case.module';
import {SolutionModule} from '../solution/solution.module';

@Module({
    controllers: [TokenController],
    providers: [TokenService],
    exports: [TokenService],
    imports: [
        TypeOrmModule.forFeature([TokenEntity]),
        forwardRef(() => SolutionModule),
        TaskModule,
        TestCaseModule,
    ],
})
export class TokenModule {}
