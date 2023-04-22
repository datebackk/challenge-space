import {Component, OnInit} from '@angular/core';
import {KeycloakService} from 'keycloak-angular';
import {KeycloakProfile} from 'keycloak-js';
import {HttpServer} from "@nestjs/common";
import {HttpClient} from "@angular/common/http";
import {tags} from "@angular-devkit/core";
import {tap} from "rxjs";

@Component({
    selector: 'challenge-space-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
    title = 'frontend-challenge-space';
    isLoggedIn = false;
    userProfile: KeycloakProfile | null = null;

    constructor(private readonly keycloak: KeycloakService, private readonly http: HttpClient) {}

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

    onClick() {
        this.http.get('http://localhost:3000/api').pipe(tap(console.log)).subscribe();
    }
}
