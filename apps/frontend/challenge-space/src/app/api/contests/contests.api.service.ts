import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';

import {ISolution} from '../../pages/contests/contest-solution/interfaces/solution.interface';
import {IContest} from '../../pages/contests/interfaces/contest.interface';
import {mapContestFromDto} from './mapers/map-contest-from.dto';
import {ContestDto} from './dto/contest.dto';
import {mapContestToDto} from './mapers/map-contest-to-dto.mapper';
import {IContestWithoutId} from '../../pages/contests/interfaces/contest-without-id.interface';

@Injectable({
    providedIn: 'root',
})
export class ContestsApiService {
    constructor(private readonly http: HttpClient) {}

    getContests(): Observable<IContest[]> {
        return this.http.get<ContestDto[]>('http://localhost:3000/api/contests').pipe(
            map((contests) => contests.map(mapContestFromDto)),
        );
    }

    getContest(id: number): Observable<IContest> {
        return this.http.get<ContestDto>(`http://localhost:3000/api/contests/${id}`).pipe(
            map(mapContestFromDto),
        );
    }

    submitTaskSolution(): Observable<any> {
        return this.http.post<IContest>('http://localhost:3000/api/contests/task', null);
    }

    createContest(contest: IContestWithoutId): Observable<IContest> {
        return this.http.post<ContestDto>(
            'http://localhost:3000/api/contests',
            mapContestToDto(contest),
        ).pipe(map(mapContestFromDto));
    }

    createSolution(solution: ISolution): Observable<ISolution> {
        return this.http.post<ISolution>('http://localhost:3000/api/solutions', solution);
    }
}
