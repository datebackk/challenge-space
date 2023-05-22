import {forwardRef, Inject, Injectable} from '@nestjs/common';
import {CreateTokenDto} from './dto/create-token.dto';
import {UpdateTokenDto} from './dto/update-token.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {TokenEntity} from './entities/token.entity';
import {ISolutionQuery} from '../solution/interfaces/solution-query.interface';
import {SolutionService} from '../solution/solution.service';
import {TaskService} from '../task/task.service';
import {TestCaseService} from '../test-case/test-case.service';
import {ITokenQuery} from './interfaces/token-query.interface';
import {Judge0Service} from '../solution/judge0.service';
import {firstValueFrom} from 'rxjs';
import {groupBy} from 'lodash';
import {ContestService} from '../contest/contest.service';

@Injectable()
export class TokenService {
    constructor(
        @InjectRepository(TokenEntity)
        private readonly tokenRepository: Repository<TokenEntity>,
        @Inject(forwardRef(() => SolutionService))
        private readonly solutionService: SolutionService,
        private readonly contestService: ContestService,
        private readonly taskService: TaskService,
        private readonly testCaseService: TestCaseService,
        private readonly judge0Service: Judge0Service,
    ) {}
    create(createTokenDto: CreateTokenDto) {

    }

    async createMany(solutionId: number, params: ISolutionQuery, judge0BatchedResponse) {
        const solution = await this.solutionService.findOneById(solutionId);
        const task = await this.taskService.findOneById(params.taskId);
        const contest = await this.contestService.findOneById(params.contestId);

        const tokens = task.testCases.map((testCase, index) => ({
            token: judge0BatchedResponse[index].token,
            task,
            contest,
            solution,
            testCase,
        }));

        tokens.forEach(tokenEntity => {
            this.tokenRepository.save(tokenEntity);
        })
    }

    async findAll(params?: ITokenQuery) {
        const tokens = await this.tokenRepository.find({
            where: {
                task: {
                    id: params?.taskId
                },
                solution: {
                    id: params?.solutionId
                },
            },
            relations: {
                task: true
            }
        });

        if (!tokens.length) {
            return [];
        }


        if (!params?.taskId) {
            const result = [];
            const groupedTokens = groupBy(tokens, (token) => token.task.id);

            for (const taskId of Object.keys(groupedTokens)) {
                const submissionResult = await firstValueFrom(this.judge0Service.getBatchedResultByTokens(groupedTokens[taskId]));

                result.push({taskId: Number(taskId), solutionId: Number(params.solutionId), contestId: Number(params.contestId), result: submissionResult})
            }

            return result;
        }

        const result = await firstValueFrom(this.judge0Service.getBatchedResultByTokens(tokens));

        return {taskId: Number(params?.taskId), solutionId: Number(params.solutionId), result};
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
