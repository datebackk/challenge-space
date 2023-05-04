import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ContestListRoutingModule} from './contest-list-routing.module';
import {ContestListComponent} from './contest-list.component';

@NgModule({
    declarations: [ContestListComponent],
    imports: [CommonModule, ContestListRoutingModule],
})
export class ContestListModule {}
