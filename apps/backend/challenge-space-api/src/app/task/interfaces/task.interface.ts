import {ITestCase} from '../../test-case/interfaces/test-case.interface';

export interface ITask {
    id: number;
    name: string;
    description: string;
    testCases: ITestCase[];
}
