import {ContestDto} from '../dto/contest.dto';
import {getISODateFromTuiDayAndTime} from '../../../shared/utils/getISODateFromTuiDayAndTime';
import {IContestWithoutId} from '../../../pages/contests/interfaces/contest-without-id.interface';

export function mapContestToDto(contest: IContestWithoutId): Partial<ContestDto> {
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
