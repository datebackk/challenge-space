import {createAction} from '@ngrx/store';

import {IContest} from '../../pages/contests/interfaces/contest.interface';
import {IContestWithoutId} from '../../pages/contests/interfaces/contest-without-id.interface';
import {IContestResults} from '../../pages/contests/interfaces/contest-results.interface';

enum ContestsActions {
    SetCurrentTask = '[Contests] set current task',
    LoadContests = '[Contests] load contests',
    LoadContestsSuccess = '[Contests] load contests success',
    LoadContestsError = '[Contests] load contests error',
    LoadContest = '[Contests] load contest',
    LoadContestSuccess = '[Contests] load contest success',
    LoadContestError = '[Contests] load contest error',
    CreateContest = '[Contests] create contest',
    CreateContestSuccess = '[Contests] create contest success',
    CreateContestError = '[Contests] create contest error',
    LoadContestResults = '[Contests] load contest results',
    LoadContestResultsSuccess = '[Contests] load contest results success',
    LoadContestResultsError = '[Contests] load contest results error',
    SelectWinner = '[Contests] select winner'
}

export const setCurrentTask = createAction(
    ContestsActions.SetCurrentTask,
    (contestId: number, taskId: number) => ({contestId, taskId}),
);

export const loadContests = createAction(ContestsActions.LoadContests);
export const loadContestsSuccess = createAction(
    ContestsActions.LoadContestsSuccess,
    (contests: IContest[]) => ({contests}),
);
export const loadContestsError = createAction(ContestsActions.LoadContestsError);

export const loadContest = createAction(
    ContestsActions.LoadContest,
    (id: number) => ({id}),
);

export const loadContestSuccess = createAction(
    ContestsActions.LoadContestSuccess,
    (contest: IContest) => ({contest}),
);

export const loadContestError = createAction(
    ContestsActions.LoadContestError,
);

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

export const loadContestResults = createAction(
    ContestsActions.LoadContestResults,
    (id: number) => ({id}),
);

export const loadContestResultsSuccess = createAction(
    ContestsActions.LoadContestResultsSuccess,
    (results: IContestResults) => ({results}),
);

export const loadContestResultsError = createAction(
    ContestsActions.LoadContestResultsError,
);

export const contestsSelectWinner = createAction(
    ContestsActions.SelectWinner,
)
