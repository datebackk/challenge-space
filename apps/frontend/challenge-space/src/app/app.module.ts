import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {TUI_SANITIZER, TuiAlertModule, TuiDialogModule, TuiRootModule} from '@taiga-ui/core';
import {NgDompurifySanitizer} from '@tinkoff/ng-dompurify';
import {KeycloakAngularModule, KeycloakService} from 'keycloak-angular';

import {AppComponent} from './app.component';
import {appRoutes} from './app.routes';
import {HttpClientModule} from "@angular/common/http";

function initializeKeycloak(keycloak: KeycloakService) {
    return async () =>
        keycloak.init({
            config: {
                realm: 'master',
                url: 'http://localhost:8080/auth',
                clientId: 'challenge-space-front',
                secret: 'gkM8NdUgInrkFpiA092ITpz10UE4V8E7',
            },
            initOptions: {
                onLoad: 'login-required',
            },
        });
}

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        RouterModule.forRoot(appRoutes, {initialNavigation: 'enabledBlocking'}),
        BrowserAnimationsModule,
        TuiRootModule,
        TuiDialogModule,
        TuiAlertModule,
        KeycloakAngularModule,
        HttpClientModule,
    ],
    providers: [
        {provide: TUI_SANITIZER, useClass: NgDompurifySanitizer},
        {
            provide: APP_INITIALIZER,
            useFactory: initializeKeycloak,
            multi: true,
            deps: [KeycloakService],
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
