import {createAction} from '@ngrx/store';
import {INotificationForAction} from './interfaces/notification-for-action.interface';
import {TuiAlertOptions} from '@taiga-ui/core';

enum RouterActions {
    NavigateByUrl = '[Router] Navigate by url',
    ShowNotification = '[Router] Show notification',
    ShowSuccessNotification = '[Router] Show success notification'
}

export const navigateByUrl = createAction(
  RouterActions.NavigateByUrl,
  (url: string) => ({url}),
);

export const showNotification = createAction(
    RouterActions.ShowNotification,
    (notificationForAction: INotificationForAction) => ({notificationForAction}),
);

export const showSuccessNotification = createAction(
    RouterActions.ShowSuccessNotification,
    (title: string, description: string, options?: Partial<TuiAlertOptions<any>>) => ({title, description, options}),
);
