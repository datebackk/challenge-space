import {createAction} from '@ngrx/store';

import {IContest} from '../../pages/contests/interfaces/contest.interface';
import {IContestWithoutId} from '../../pages/contests/interfaces/contest-without-id.interface';

enum ContestsActions {
    LoadContests = '[Contests] load contests',
    LoadContestsSuccess = '[Contests] load contests success',
    LoadContestsError = '[Contests] load contests error',
    CreateContest = '[Contests] create contest',
    CreateContestSuccess = '[Contests] create contest success',
    CreateContestError = '[Contests] create contest error',
}

export const loadContests = createAction(ContestsActions.LoadContests);
export const loadContestsSuccess = createAction(
    ContestsActions.LoadContestsSuccess,
    (contests: IContest[]) => ({contests}),
);
export const loadContestsError = createAction(ContestsActions.LoadContestsError);

export const createContest = createAction(
    ContestsActions.CreateContest,
    (contest: IContestWithoutId) => ({contest}),
);
export const createContestSuccess = createAction(
    ContestsActions.CreateContestSuccess,
    (contest: IContest) => ({contest}),
);
export const createContestError = createAction(
    ContestsActions.CreateContestError
);
