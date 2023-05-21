import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {IJudge0Submission} from '../../../../shared/interfaces/judge0-submission.interface';

@Component({
    selector: 'challenge-space-solution-task-output',
    templateUrl: './solution-task-output.component.html',
    styleUrls: ['./solution-task-output.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SolutionTaskOutputComponent {
    @Input() result!: IJudge0Submission
}
