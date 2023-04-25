import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
    selector: 'challenge-space-contest',
    templateUrl: './contest.component.html',
    styleUrls: ['./contest.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContestComponent {}
