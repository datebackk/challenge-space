import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {IContest} from '../../pages/contests/interfaces/contest.interface';

@Injectable({
    providedIn: 'root',
})
export class ContestsApiService {
    constructor(private readonly http: HttpClient) {}

    createContest(contest: IContest): Observable<IContest> {
        return this.http.post<IContest>('http://localhost:3000/api/contests/create', contest);
    }
}
