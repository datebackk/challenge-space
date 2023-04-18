import {Component, OnInit} from '@angular/core';
import {KeycloakService} from 'keycloak-angular';
import {KeycloakProfile} from 'keycloak-js';

@Component({
    selector: 'challenge-space-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
    title = 'frontend-challenge-space';
    isLoggedIn = false;
    userProfile: KeycloakProfile | null = null;

    constructor(private readonly keycloak: KeycloakService) {}

    async ngOnInit(): Promise<void> {
        this.isLoggedIn = await this.keycloak.isLoggedIn();

        if (this.isLoggedIn) {
            this.userProfile = await this.keycloak.loadUserProfile();
        }
    }

    login() {
        this.keycloak.login();
    }

    logout() {
        this.keycloak.logout();
    }
}
