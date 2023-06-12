import {forwardRef, Inject, Injectable} from '@nestjs/common';
import {CreateSolutionDto} from './dto/create-solution.dto';
import {UpdateSolutionDto} from './dto/update-solution.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {SolutionEntity} from './entities/solution.entity';
import {UserService} from '../user/user.service';
import {ContestService} from '../contest/contest.service';
import {add, min} from 'date-fns'
import {ISolutionQuery} from './interfaces/solution-query.interface';
import {Judge0Service} from './judge0.service';
import {TokenService} from '../token/token.service';
import {TaskSolutionDto} from './dto/task-solution.dto';
import {TaskService} from '../task/task.service';
import {Judge0BatchedRequestDto} from './dto/judge0-batched-request-dto';
import {Judge0SubmissionRequestDto} from './dto/judge0-submission-request.dto';

@Injectable()
export class SolutionService {
    constructor(
        @InjectRepository(SolutionEntity)
        private readonly solutionRepository: Repository<SolutionEntity>,
        @Inject(forwardRef(() => TokenService))
        private readonly tokenService: TokenService,
        private readonly userService: UserService,
        @Inject(forwardRef(() => ContestService))
        private readonly contestService: ContestService,
        private readonly judge0Service: Judge0Service,
        private readonly taskService: TaskService,
    ) {}
    async create(keycloackUser, createSolutionDto: CreateSolutionDto) {
        const contest = await this.contestService.findOne(createSolutionDto.contestId);
        const user = await this.userService.findMatchedKeycloackUser(keycloackUser);

        const shouldCompleteAt = min([contest.endDate, add(new Date(), {minutes: contest.duration})]);

        return this.solutionRepository.save({contest, user, shouldCompleteAt});
    }

    async findAll({contestId}: ISolutionQuery) {
        return this.solutionRepository.find({
            where: {
                contest: {
                    id: contestId
                }
            },
            relations: {
                user: true,
                contest: {tasks: {testCases: true}},
            }
        });
    }

    async findOne(keycloackUser, {contestId}: ISolutionQuery) {
        const user = await this.userService.findMatchedKeycloackUser(keycloackUser);

        return this.solutionRepository.findOne({
            where: {
                user: {
                    id: user.id,
                },
                contest: {
                    id: contestId
                },
            },
            relations: {
                user: true,
                contest: true,
            }
        });
    }

    async createTaskSolution(solutionId: number, params: ISolutionQuery, taskSolutionDto: TaskSolutionDto) {
        const task = await this.taskService.findOneById(params.taskId);
        const judge0SubmissionRequestDto: Judge0SubmissionRequestDto[] = task.testCases.map(testCase => ({
            language_id: taskSolutionDto.language_id,
            source_code: taskSolutionDto.source_code,
            stdin: testCase.input,
            expected_output: testCase.output,
        }));

        const judge0BatchedRequestDto: Judge0BatchedRequestDto = {
            submissions: judge0SubmissionRequestDto
        }

        this.judge0Service.createBatchedSubmission(judge0BatchedRequestDto).subscribe(result => {
            const tokens = this.tokenService.removeMany(solutionId, params);

            this.tokenService.createMany(solutionId, params, result)
        });
    }

    findOneById(id: number) {
        return this.solutionRepository.findOneBy({id});
    }

    update(id: number, updateSolutionDto: UpdateSolutionDto) {
        return `This action updates a #${id} solution`;
    }

    remove(id: number) {
        return `This action removes a #${id} solution`;
    }
}
