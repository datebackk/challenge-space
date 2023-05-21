export interface IContestTask {
    id: number;
    name: string;
    description: string;
    testCases: IContestTask[];
}
