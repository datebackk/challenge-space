import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {IContestResults} from '../../interfaces/contest-results.interface';

@Component({
    selector: 'challenge-space-contest-results',
    templateUrl: './contest-results.component.html',
    styleUrls: ['./contest-results.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContestResultsComponent {
    @Input() contestResults!: IContestResults | null;
}
