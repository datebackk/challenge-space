import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';

import {logoutUser} from '../../../store/auth/auth.actions';
import {routerRoutes} from '../../constants/router-routes.const';
import {IUser} from "../../interfaces/user.interface";

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

    constructor(private readonly router: Router, private readonly store: Store) {}

    onMyProfile() {
        this.router.navigate([`/employees/profile/${this.user.id}`]);
    }

    onLogout() {
        this.store.dispatch(logoutUser());
    }
}
