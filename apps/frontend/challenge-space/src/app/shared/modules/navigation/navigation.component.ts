import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Router} from '@angular/router';

import {routerRoutes} from '../../constants/router-routes.const';
import {IUser} from "../../interfaces/user.interface";
import {KeycloakService} from 'keycloak-angular';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {
    @Input()
    user!: IUser;

    readonly tabs = routerRoutes;
    open = false;
    activeItemIndex = 0;
    activeSubNavigationItemIndex = 0;

    constructor(
        private readonly router: Router,
        private readonly keycloakService: KeycloakService,
    ) {}

    onMyProfile() {
        this.router.navigate([`/users/${this.user.id}`]);
    }

    onLogout() {
        this.keycloakService.logout();
    }
}
