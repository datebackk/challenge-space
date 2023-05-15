import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import type {CreateContestDto} from './dto/create-contest.dto';
import type {UpdateContestDto} from './dto/update-contest.dto';
import {ContestEntity} from './entities/contest.entity';
import {UserService} from '../user/user.service';

@Injectable()
export class ContestService {
    constructor(
        @InjectRepository(ContestEntity)
        private readonly contestRepository: Repository<ContestEntity>,
        private readonly userService: UserService,
    ) {}

    async create(keycloackUser, createContestDto: CreateContestDto) {
        const contest = await this.contestRepository.create(createContestDto);
        const user = await this.userService.findMatchedKeycloackUser(keycloackUser);

        return this.contestRepository.save({...contest, user});
    }

    findAll() {
        return `This action returns all contest`;
    }

    findOne(id: number) {
        return `This action returns a #${id} contest`;
    }

    update(id: number, updateContestDto: UpdateContestDto) {
        return `This action updates a #${id} contest`;
    }

    remove(id: number) {
        return `This action removes a #${id} contest`;
    }
}
