import {IContest} from '../../../pages/contests/interfaces/contest.interface';
import {ContestDto} from '../dto/contest.dto';
import {getISODateFromTuiDayAndTime} from '../../../shared/utils/getISODateFromTuiDayAndTime';

export function mapContestToDto(contest: IContest): ContestDto {
    const {
        mainSettings,
        tasks
    } = contest;

    const {
        name,
        description,
        duration,
        interval,
    } = mainSettings

    return {
        name,
        description,
        startDate: getISODateFromTuiDayAndTime(interval.startDate),
        endDate: getISODateFromTuiDayAndTime(interval.endDate),
        duration,
        tasks
    }
}
