import {IContestMainSettings} from '../../../pages/contests/interfaces/contest-main-settings.interface';
import {IContestTask} from '../../../pages/contests/interfaces/contest-task.interface';

export interface ContestDto extends Omit<IContestMainSettings, 'interval'> {
    startDate: Date;
    endDate: Date;
    tasks: IContestTask[];
}
