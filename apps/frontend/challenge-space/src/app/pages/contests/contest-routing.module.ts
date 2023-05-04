import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ContestComponent} from './contest.component';

const routes: Routes = [
    {
        path: '',
        component: ContestComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('./contest-list/contest-list.module').then(m => m.ContestListModule),
            },
            {
                path: 'create',
                loadChildren: () => import('./contest-form/contest-form.module').then(m => m.ContestFormModule),
            },
            {
                path: 'solution',
                loadChildren: () => import('./contest-solution/contest-solution.module').then(m => m.ContestSolutionModule),
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ContestRoutingModule {}
