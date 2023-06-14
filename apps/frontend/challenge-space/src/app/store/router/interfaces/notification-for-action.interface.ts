import {TuiAlertOptions} from '@taiga-ui/core';

export interface INotificationForAction {
    content?: string;
    options?: Partial<TuiAlertOptions<any>>;
}
