import {IContest} from '../../../pages/contests/interfaces/contest.interface';
import {ContestDto} from '../dto/contest.dto';

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
        startDate: interval.startDate,
        endDate: interval.endDate,
        duration,
        tasks
    }
}
