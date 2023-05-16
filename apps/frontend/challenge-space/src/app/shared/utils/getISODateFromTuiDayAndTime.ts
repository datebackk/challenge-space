import {TuiDay, TuiTime} from '@taiga-ui/cdk';

export function getISODateFromTuiDayAndTime([day, time]: [TuiDay, TuiTime]) {
    const date = new Date(day.toJSON());

    date.setHours(time.hours)
    date.setMinutes(time.minutes)
    date.setSeconds(time.seconds);

    return date.toISOString();
}
