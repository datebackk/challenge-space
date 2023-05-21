import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ISolution} from '../../pages/contests/contest-solution/interfaces/solution.interface';
import {Observable} from 'rxjs';
import {ISolutionWithoutId} from '../../pages/contests/contest-solution/interfaces/solution-without-id.interface';
import {IJudge0BatchedResponse} from '../../shared/interfaces/judge0-batched-response.interface';
import {IJudge0Submission} from '../../shared/interfaces/judge0-submission.interface';

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
    submitTaskSolution(solutionId: number, taskId: number, body: IJudge0Submission,): Observable<void> {
        return this.http.post<any>(`http://localhost:3000/api/solutions/${solutionId}`, body, {params: {taskId}});
    }

    getSolutionTaskResults(solutionId: number, taskId: number): Observable<IJudge0BatchedResponse> {
        return this.http.get<IJudge0BatchedResponse>(`http://localhost:3000/api/solutions`, {params: {solutionId, taskId}});
    }
}
