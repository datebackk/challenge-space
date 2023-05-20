import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {IContest} from '../../interfaces/contest.interface';
import {LoadingStatus} from '../../../../shared/enums/loading-status.enum';
import {ISolution} from '../interfaces/solution.interface';

@Component({
    selector: 'challenge-space-solution-welcome',
    templateUrl: './solution-welcome.component.html',
    styleUrls: ['./solution-welcome.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SolutionWelcomeComponent {
    @Input() contest!: IContest;
    @Input() solution: ISolution | undefined;
    @Input() createSolutionLoadingStatus!: LoadingStatus;

    @Output() startContest = new EventEmitter<void>();

    get isLoading(): boolean {
        return  this.createSolutionLoadingStatus === LoadingStatus.Loading;
    }

    onStartContest(): void {
        this.startContest.emit();
    }
}
