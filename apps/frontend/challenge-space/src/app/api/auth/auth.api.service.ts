import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {IUser} from '../../shared/interfaces/user.interface';

@Injectable({
    providedIn: 'root',
})
export class AuthApiService {
    constructor(private readonly http: HttpClient) {}

    getCurrentUser(): Observable<IUser> {
        return this.http.get<IUser>('http://localhost:3000/api/users/me');
    }
}
