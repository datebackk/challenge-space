import {IContestTask} from '../../../pages/contests/interfaces/contest-task.interface';
import {IContestMainSettings} from '../../../pages/contests/interfaces/contest-main-settings.interface';

export interface CreateContestDto extends Omit<IContestMainSettings, 'interval'> {
    startDate: string;
    endDate: string;
    tasks: IContestTask[];
}
