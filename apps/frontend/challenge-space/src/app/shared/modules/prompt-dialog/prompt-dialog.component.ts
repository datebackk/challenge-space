import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {TuiDialogContext, TuiDialogService} from '@taiga-ui/core';
import {POLYMORPHEUS_CONTEXT} from '@tinkoff/ng-polymorpheus';


@Component({
    selector: 'challenge-space-prompt-dialog',
    templateUrl: './prompt-dialog.component.html',
    styleUrls: ['./prompt-dialog.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PromptDialogComponent {
    constructor(@Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
                @Inject(POLYMORPHEUS_CONTEXT)
                private readonly context: TuiDialogContext<boolean, string>,) {
    }

    get data(): string {
        return this.context.data;
    }

    onConfirm(): void {
        this.context.completeWith(true);
    }

    onReject(): void {
        this.context.completeWith(false);
    }
}
