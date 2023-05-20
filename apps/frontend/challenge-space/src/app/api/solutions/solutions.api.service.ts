import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ISolution} from '../../pages/contests/contest-solution/interfaces/solution.interface';
import {Observable} from 'rxjs';
import {ISolutionWithoutId} from '../../pages/contests/contest-solution/interfaces/solution-without-id.interface';

@Injectable({
    providedIn: 'root'
})
export class SolutionsApiService {
    constructor(private readonly http: HttpClient) {}

    getSolutionByContestId(contestId: number): Observable<ISolution> {
        return this.http.get<ISolution>(`http://localhost:3000/api/solutions/solution`, {params: {contestId}});
    }

    createSolution(solution: ISolutionWithoutId): Observable<ISolution> {
        return this.http.post<ISolution>(`http://localhost:3000/api/solutions`, solution);
    }
}
