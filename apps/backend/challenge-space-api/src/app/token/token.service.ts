import {forwardRef, Inject, Injectable} from '@nestjs/common';
import { CreateTokenDto } from './dto/create-token.dto';
import { UpdateTokenDto } from './dto/update-token.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {TokenEntity} from './entities/token.entity';
import {ISolutionQuery} from '../solution/interfaces/solution-query.interface';
import {SolutionService} from '../solution/solution.service';
import {TaskService} from '../task/task.service';
import {TestCaseService} from '../test-case/test-case.service';

@Injectable()
export class TokenService {
    constructor(
        @InjectRepository(TokenEntity)
        private readonly tokenRepository: Repository<TokenEntity>,
        @Inject(forwardRef(() => SolutionService))
        private readonly solutionService: SolutionService,
        private readonly taskService: TaskService,
        private readonly testCaseService: TestCaseService,
    ) {}
    create(createTokenDto: CreateTokenDto) {
        return 'This action adds a new token';
    }

    async createMany(solutionId: number, params: ISolutionQuery, judge0BatchedResponse) {
        const solution = await this.solutionService.findOneById(solutionId)
        const task = await this.taskService.findOneById(params.taskId);
        const testCase = await this.testCaseService.findOneById(params.testCaseId);
        const tokens = task.testCases.map((testCase, index) => ({
            token: judge0BatchedResponse[index].token,
            task,
            solution,
            testCase
        }));

        tokens.forEach(tokenEntity => {
            this.tokenRepository.save(tokenEntity);
        })
    }

    findAll() {
        return `This action returns all token`;
    }

    findOne(id: number) {
        return `This action returns a #${id} token`;
    }

    update(id: number, updateTokenDto: UpdateTokenDto) {
        return `This action updates a #${id} token`;
    }

    remove(id: number) {
        return `This action removes a #${id} token`;
    }

    async removeMany(solutionId: number, params: ISolutionQuery) {
        const tokens = await this.tokenRepository.findBy({
            solution: {
                id: solutionId
            },
            task: {
                id: params?.taskId
            },
            testCase: {
                id: params?.testCaseId
            }
        });

        this.tokenRepository.remove(tokens)
    }
}
