import {LoadingStatus} from '../../shared/enums/loading-status.enum';

export interface IContestsState {
    createLoadingStatus: LoadingStatus;
}

export const contestsInitialState: IContestsState = {
    createLoadingStatus: LoadingStatus.Success,
};
