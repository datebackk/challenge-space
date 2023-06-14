import {ChangeDetectionStrategy, Component, EventEmitter, Inject, Injector, Input, Output} from '@angular/core';
import {IContest} from '../../interfaces/contest.interface';
import {LoadingStatus} from '../../../../shared/enums/loading-status.enum';
import {ISolution} from '../interfaces/solution.interface';
import {TuiDialogService} from '@taiga-ui/core';
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus';
import {PromptDialogComponent} from '../../../../shared/modules/prompt-dialog/prompt-dialog.component';
import {filter} from 'rxjs';

@Component({
    selector: 'challenge-space-solution-welcome',
    templateUrl: './solution-welcome.component.html',
    styleUrls: ['./solution-welcome.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SolutionWelcomeComponent {
    @Input() contest!: IContest;
    @Input() solution: ISolution | undefined;
    @Input() isOwner!: boolean;
    @Input() isComplete!: boolean;
    @Input() createSolutionLoadingStatus!: LoadingStatus;

    @Output() startContest = new EventEmitter<void>();

    private readonly dialog = this.dialogs.open<number>(
        new PolymorpheusComponent(PromptDialogComponent, this.injector),
        {
            label: 'Вы уверены что хотите начать соревнование?',
            data: 'После начала соревнования его нельзя будет приостановить'
        },
    );

    constructor(
        @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
        @Inject(Injector) private readonly injector: Injector,
    ) {}

    get isLoading(): boolean {
        return  this.createSolutionLoadingStatus === LoadingStatus.Loading;
    }

    canStartContest(): boolean {
        if (this.isOwner || this.isComplete) {
            return false;
        }

        if (!this.solution) {
            return true
        }

        return false;
    }

    onStartContest(): void {
        this.dialog.pipe(filter(Boolean)).subscribe(() => {
            this.startContest.emit();
        });
    }
}
