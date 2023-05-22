import {IJudge0BatchedResponse} from '../../../../shared/interfaces/judge0-batched-response.interface';

export interface IContestTaskSolution {
    solutionId: number;
    taskId: number;
    result: IJudge0BatchedResponse;
    isFullLoaded: boolean;
}
