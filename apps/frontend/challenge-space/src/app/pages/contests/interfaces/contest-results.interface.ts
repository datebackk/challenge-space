import {IContestMainSettings} from './contest-main-settings.interface';
import {IContestTask} from './contest-task.interface';

export interface IContestResults extends IContestMainSettings {
    id: number;
    tasks: IContestTask[];
}
