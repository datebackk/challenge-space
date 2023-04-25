import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ContestFormComponent} from './contest-form.component';

const routes: Routes = [
    {
        path: '',
        component: ContestFormComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ContestFormRotingModule {}
