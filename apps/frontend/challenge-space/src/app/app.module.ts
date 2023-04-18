import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {TUI_SANITIZER, TuiAlertModule, TuiDialogModule, TuiRootModule} from '@taiga-ui/core';
import {NgDompurifySanitizer} from '@tinkoff/ng-dompurify';
import {KeycloakAngularModule, KeycloakService} from 'keycloak-angular';

import {AppComponent} from './app.component';
import {appRoutes} from './app.routes';

function initializeKeycloak(keycloak: KeycloakService) {
    return async () =>
        keycloak.init({
            config: {
                realm: 'master',
                url: 'http://localhost:8080/auth',
                clientId: 'challenge-space-front',
            },
            initOptions: {
                checkLoginIframe: true,
                checkLoginIframeInterval: 25,
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
