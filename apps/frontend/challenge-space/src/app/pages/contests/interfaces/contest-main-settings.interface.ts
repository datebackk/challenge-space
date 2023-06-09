import {IContestMainSettingsInterval} from './contest-main-settings-interval.interface';

export interface IContestMainSettings {
    name: string;
    description: string;
    interval: IContestMainSettingsInterval;
    duration: string;
}
