import { Injectable } from '@nestjs/common';
import { CreateTestCaseDto } from './dto/create-test-case.dto';
import { UpdateTestCaseDto } from './dto/update-test-case.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {TestCaseEntity} from './entities/test-case.entity';

@Injectable()
export class TestCaseService {
    constructor(
        @InjectRepository(TestCaseEntity)
        private readonly testCaseRepository: Repository<TestCaseEntity>,
    ) {
    }
    create(createTestCaseDto: CreateTestCaseDto) {
        return 'This action adds a new testCase';
    }

    findAll() {
        return `This action returns all testCase`;
    }

    findOne(id: number) {
        return `This action returns a #${id} testCase`;
    }

    findOneById(id: number) {
        return this.testCaseRepository.findOneBy({id});
    }

    update(id: number, updateTestCaseDto: UpdateTestCaseDto) {
        return `This action updates a #${id} testCase`;
    }

    remove(id: number) {
        return `This action removes a #${id} testCase`;
    }
}
