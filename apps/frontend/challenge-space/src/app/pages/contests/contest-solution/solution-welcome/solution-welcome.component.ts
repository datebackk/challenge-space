import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
    selector: 'challenge-space-solution-welcome',
    templateUrl: './solution-welcome.component.html',
    styleUrls: ['./solution-welcome.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SolutionWelcomeComponent {}
