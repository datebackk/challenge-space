import {ContestDto} from '../dto/contest.dto';
import {IContest} from '../../../pages/contests/interfaces/contest.interface';

export function mapContestFromDtoMapper(contest: ContestDto): IContest {
    const {
        name,
        description,
        startDate,
        endDate,
        duration,
        tasks,
    } = contest;

    return {
        mainSettings: {
            name,
            description,
            interval: {
                startDate,
                endDate
            },
            duration,
        },
        tasks
    }
}
