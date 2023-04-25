import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ContestComponent} from './contest.component';

const routes: Routes = [
    {
        path: '',
        component: ContestComponent,
        children: [
            {
                path: 'create',
                loadChildren: () => import('./contest-form/contest-form.module').then(m => m.ContestFormModule),
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ContestRoutingModule {}
