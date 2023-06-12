import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./pages/contests/contest.module').then(m => m.ContestModule),
    },
    {
        path: 'users',
        loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
    exports: [RouterModule],
})
export class AppRoutingModule {}
