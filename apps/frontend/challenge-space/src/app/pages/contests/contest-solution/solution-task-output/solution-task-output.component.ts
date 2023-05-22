import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {IJudge0Submission} from '../../../../shared/interfaces/judge0-submission.interface';
import {judge0SubmissionSuccessStatuses} from '../../../../shared/constants/judge0-submission-success-statuses.const';
import {judge0SubmissionErrorStatus} from '../../../../shared/constants/judge0-submission-error-status.const';
import {judge0SubmissionWaitingStatuses} from '../../../../shared/constants/judge0-submission-waiting-statuses.const';

@Component({
    selector: 'challenge-space-solution-task-output',
    templateUrl: './solution-task-output.component.html',
    styleUrls: ['./solution-task-output.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SolutionTaskOutputComponent {
    @Input() result!: IJudge0Submission;
    @Input() isFullLoaded!: boolean;
    @Input() index!: number;

    get isPassed(): boolean {
        return this.result.status?.id ? this.result.status.id in judge0SubmissionSuccessStatuses : false
    }

    get isFailed(): boolean {
        return this.result.status?.id ? this.result.status.id in judge0SubmissionErrorStatus : false
    }

    get isProcessing(): boolean {
        return this.result.status?.id ? this.result.status.id in judge0SubmissionWaitingStatuses : false
    }

    get text(): string {
        return  this.result?.stderr || 'Passed';
    }
}
