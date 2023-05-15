import {CreateTestCaseDto} from '../../test-case/dto/create-test-case.dto';

export class CreateTaskDto {
    name: string;
    description: string;
    testCases: CreateTestCaseDto[];
}
