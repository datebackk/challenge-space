import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UsersRoutingModule} from './users-routing.module';
import {UsersComponent} from './users.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {TuiAvatarModule, TuiIslandModule} from '@taiga-ui/kit';
import {TuiLetModule} from '@taiga-ui/cdk';
import {ContestListModule} from '../contests/contest-list/contest-list.module';

@NgModule({
    declarations: [UsersComponent, UserProfileComponent],
    imports: [CommonModule, UsersRoutingModule, TuiAvatarModule, TuiIslandModule, TuiLetModule, ContestListModule],
})
export class UsersModule {}
