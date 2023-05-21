export interface IContestTask {
    id: number;
    name: string;
    condition: string;
    testCases: IContestTask[];
}
