import {forwardRef, Inject, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import type {CreateContestDto} from './dto/create-contest.dto';
import type {UpdateContestDto} from './dto/update-contest.dto';
import {ContestEntity} from './entities/contest.entity';
import {UserService} from '../user/user.service';
import {TokenService} from '../token/token.service';
import {SolutionService} from '../solution/solution.service';

@Injectable()
export class ContestService {
    constructor(
        @InjectRepository(ContestEntity)
        private readonly contestRepository: Repository<ContestEntity>,
        private readonly userService: UserService,
        @Inject(forwardRef(() => TokenService))
        private readonly tokenService: TokenService,
        @Inject(forwardRef(() => SolutionService))
        private readonly solutionService: SolutionService,
    ) {}

    async create(keycloackUser, createContestDto: CreateContestDto) {
        const contest = await this.contestRepository.create(createContestDto);
        const user = await this.userService.findMatchedKeycloackUser(keycloackUser);

        return this.contestRepository.save({...contest, user});
    }

    findAll() {
        return this.contestRepository.find({
            relations: {
            tasks: {
                testCases: true
                }
            }
        });
    }

    async getContestResults(id: number) {
        const solutions = await this.solutionService.findAll({contestId: id});

        return await Promise.all(solutions.map(async solution => {
            const tasks = await Promise.all(solution.contest.tasks.map(async task => {

                const testCases = await Promise.all(task.testCases.map(async testCase => {
                    const testCaseWithResult = await this.tokenService.findAll({
                        solutionId: solution.id,
                        taskId: task.id,
                        testCaseId: testCase.id
                    })
                    return {...testCase, result: testCaseWithResult};
                }));

                return {...task, testCases};

            }));

            // @ts-ignore
            solution.contest.tasks = tasks;

            return {...solution};
        }));
    }

    findOneById(id: number) {
        return this.contestRepository.findOneBy({id});
    }

    findOne(id: number) {
        return this.contestRepository.findOneOrFail({
            where: {id},
            relations: {
                tasks: {
                    testCases: true
                }
            },
        });
    }

    update(id: number, updateContestDto: UpdateContestDto) {
        return `This action updates a #${id} contest`;
    }

    remove(id: number) {
        return `This action removes a #${id} contest`;
    }
}
