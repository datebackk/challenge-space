import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';

import {ISolution} from '../../pages/contests/contest-solution/interfaces/solution.interface';
import {IContest} from '../../pages/contests/interfaces/contest.interface';
import {mapContestFromDtoMapper} from './mapers/map-contest-from-dto.mapper';
import {ContestDto} from './dto/contest.dto';
import {mapContestToDto} from './mapers/map-contest-to-dto.mapper';

@Injectable({
    providedIn: 'root',
})
export class ContestsApiService {
    constructor(private readonly http: HttpClient) {}

    loadContests(): Observable<IContest> {
        return this.http.get<IContest>('http://localhost:3000/api/contests');
    }

    submitTaskSolution(): Observable<any> {
        return this.http.post<IContest>('http://localhost:3000/api/contests/task', null);
    }

    createContest(contest: IContest): Observable<IContest> {
        return this.http.post<ContestDto>(
            'http://localhost:3000/api/contests',
            mapContestToDto(contest),
        ).pipe(map(mapContestFromDtoMapper));
    }

    createSolution(solution: ISolution): Observable<ISolution> {
        return this.http.post<ISolution>('http://localhost:3000/api/solutions', solution);
    }
}
