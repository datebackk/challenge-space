import {IContestMainSettings} from './contest-main-settings.interface';
import {IContestTask} from './contest-task.interface';

export interface IContestWithoutId {
    mainSettings: IContestMainSettings;
    tasks: IContestTask[];
}
