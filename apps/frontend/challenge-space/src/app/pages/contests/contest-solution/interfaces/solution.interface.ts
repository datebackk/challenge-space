import {ISolutionWithoutId} from './solution-without-id.interface';

export interface ISolution extends ISolutionWithoutId {
    id: number;
    createdAt: string;
    completeAt?: string;
    shouldCompleteAt: string;
}
