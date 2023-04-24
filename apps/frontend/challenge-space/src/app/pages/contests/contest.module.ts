import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {ContestComponent} from './contest.component';
import {ContestRoutingModule} from './contest-routing.module';

@NgModule({
    declarations: [ContestComponent],
    imports: [CommonModule, ContestRoutingModule],
})
export class ContestModule {}
