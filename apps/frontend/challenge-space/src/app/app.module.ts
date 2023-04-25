import {HttpClientModule} from '@angular/common/http';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {TUI_SANITIZER, TuiAlertModule, TuiDialogModule, TuiRootModule} from '@taiga-ui/core';
import {NgDompurifySanitizer} from '@tinkoff/ng-dompurify';
import {KeycloakAngularModule, KeycloakService} from 'keycloak-angular';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {NavigationModule} from './shared/modules/navigation/navigation.module';
import {SharedModule} from './shared/shared.module';
import {effects} from './store/effects';
import {reducers} from './store/reducers';

function initializeKeycloak(keycloak: KeycloakService) {
    return async () =>
        keycloak.init({
            config: {
                realm: 'master',
                url: 'http://localhost:8080/auth',
                clientId: 'challenge-space-front',
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
        AppRoutingModule,
        BrowserAnimationsModule,
        TuiRootModule,
        TuiDialogModule,
        TuiAlertModule,
        KeycloakAngularModule,
        HttpClientModule,
        SharedModule,
        StoreModule.forRoot(reducers, {}),
        EffectsModule.forRoot(effects),
        StoreDevtoolsModule.instrument({maxAge: 25}),
        NavigationModule,
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
