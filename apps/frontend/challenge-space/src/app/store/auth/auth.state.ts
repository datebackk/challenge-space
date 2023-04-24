import {LoadingStatus} from '../../shared/enums/loading-status.enum';
import {IUser} from '../../shared/interfaces/user.interface';

export interface IAuthState {
    user: IUser | null;
    loadingStatus: LoadingStatus;
}

export const authInitialState: IAuthState = {
    user: null,
    loadingStatus: LoadingStatus.Success,
};
