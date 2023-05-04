import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
    selector: 'challenge-space-contest-list',
    templateUrl: './contest-list.component.html',
    styleUrls: ['./contest-list.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContestListComponent {}
