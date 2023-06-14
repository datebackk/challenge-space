import {Actions, createEffect, ofType} from "@ngrx/effects";
import {navigateByUrl, showNotification, showSuccessNotification} from "./router.actions";
import {mergeMap, tap} from "rxjs";
import {Router} from "@angular/router";
import {Inject, Injectable} from "@angular/core";
import {TuiAlertService, TuiNotification} from '@taiga-ui/core';

@Injectable()
export class RouterEffects {
    navigateByUrl = createEffect(() =>
        this.actions$.pipe(
          ofType(navigateByUrl),
          tap(({url}) => {
            this.router.navigate([url]);
          })
        ),
        {dispatch: false}
    );

    showNotification = createEffect(() =>
            this.actions$.pipe(
                ofType(showNotification),
                mergeMap(({notificationForAction}) => {
                    return this.tuiAlertService.open(
                        notificationForAction.content ? notificationForAction.content : '',
                        notificationForAction.options ? notificationForAction.options : undefined,
                    );
                })
            ),
        {dispatch: false}
    );

    showSuccessNotification = createEffect(() =>
            this.actions$.pipe(
                ofType(showSuccessNotification),
                mergeMap(({title, description, options}) => [
                    showNotification({
                        content: description,
                        options: {...options, label: title, status: TuiNotification.Success},
                    }),
                ]),
            ),
    );


    constructor(
        private readonly actions$: Actions,
        private readonly router: Router,
        @Inject(TuiAlertService) private readonly tuiAlertService: TuiAlertService,
    ) {}
}
