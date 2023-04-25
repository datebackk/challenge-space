import {HttpClient} from '@angular/common/http';
import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {KeycloakService} from 'keycloak-angular';
import {KeycloakProfile} from 'keycloak-js';
import {Observable, tap} from 'rxjs';

import {IUser} from './shared/interfaces/user.interface';
import {loadUser} from './store/auth/auth.actions';
import {getUser} from './store/auth/auth.reducer';

@Component({
    selector: 'challenge-space-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
    title = 'frontend-challenge-space';
    isLoggedIn = false;
    userProfile: KeycloakProfile | null = null;
    user$: Observable<IUser | null> = this.store.pipe(select(getUser));

    constructor(
        private readonly keycloak: KeycloakService,
        private readonly http: HttpClient,
        private readonly store: Store,
    ) {}

    async ngOnInit(): Promise<void> {
        this.isLoggedIn = await this.keycloak.isLoggedIn();

        if (this.isLoggedIn) {
            this.userProfile = await this.keycloak.loadUserProfile();
        }

        this.store.dispatch(loadUser());
    }

    login() {
        this.keycloak.login();
    }

    logout() {
        this.keycloak.logout();
    }

    onClick() {
        this.http.get('http://localhost:3000/api/current-user').pipe(tap(console.log)).subscribe();
    }
}
