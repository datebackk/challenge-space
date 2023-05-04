import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ContestSolutionComponent} from './contest-solution.component';

const routes: Routes = [
    {
        path: '',
        component: ContestSolutionComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ContestSolutionRoutingModule {}
