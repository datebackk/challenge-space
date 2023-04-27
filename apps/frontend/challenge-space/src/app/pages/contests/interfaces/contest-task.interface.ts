export interface IContestTask {
    name: string;
    condition: string;
    testCases: IContestTask[];
}
