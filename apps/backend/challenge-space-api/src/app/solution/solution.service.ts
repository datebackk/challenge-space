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

@Injectable()
export class SolutionService {
    constructor(
        @InjectRepository(SolutionEntity)
        private readonly solutionRepository: Repository<SolutionEntity>,
        private readonly userService: UserService,
        private readonly contestService: ContestService,
        @Inject(forwardRef(() => TokenService))
        private readonly tokenService: TokenService,
        private readonly judge0Service: Judge0Service,
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
                contest: true,
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
        this.judge0Service.createBatchedSubmission(taskSolutionDto).subscribe(result => {
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
