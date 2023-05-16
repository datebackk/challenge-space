import {TuiDay, TuiTime} from '@taiga-ui/cdk';

export function getTuiDayAndTimeFromISODate(date: string): [TuiDay, TuiTime] {
    const nativeDate = new Date(date);

    return [TuiDay.fromUtcNativeDate(nativeDate), TuiTime.fromLocalNativeDate(nativeDate)];
}
