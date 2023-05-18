import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ContestListRoutingModule} from './contest-list-routing.module';
import {ContestListComponent} from './contest-list.component';
import {ContestCardComponent} from './contest-card/contest-card.component';
import {TuiIslandModule} from '@taiga-ui/kit';

@NgModule({
    declarations: [ContestListComponent, ContestCardComponent, ContestCardComponent],
    imports: [CommonModule, ContestListRoutingModule, TuiIslandModule],
})
export class ContestListModule {}
