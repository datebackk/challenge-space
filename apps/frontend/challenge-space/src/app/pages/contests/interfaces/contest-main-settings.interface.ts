import {TuiDay} from '@taiga-ui/cdk';

import {IContestMainSettingsInterval} from './contest-main-settings-interval.interface';

export interface IContestMainSettings {
    name: string;
    description: string;
    interval: IContestMainSettingsInterval;
    duration: TuiDay;
}
