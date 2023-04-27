import {createAction} from '@ngrx/store';

import {IContest} from '../../pages/contests/interfaces/contest.interface';

enum ContestsActions {
    CreateContest = '[Contests] create contest',
    CreateContestSuccess = '[Contests] create contest success',
    CreateContestError = '[Contests] create contest error',
}

export const createContest = createAction(
    ContestsActions.CreateContest,
    (contest: IContest) => ({contest,})
);
export const createContestSuccess = createAction(
    ContestsActions.CreateContestSuccess,
    (contest: IContest) => ({contest,})
);
export const createContestError = createAction(
    ContestsActions.CreateContestError,
    (contest: IContest) => ({contest,})
);
