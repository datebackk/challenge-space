import {IJudge0SubmissionStatusInterface} from './judge0-submission-status.interface';
import {IJudge0SubmissionRequiredParameters} from './judge0-submission-required-parametrs.interface';

export interface IJudge0Submission extends IJudge0SubmissionRequiredParameters {
    status?: IJudge0SubmissionStatusInterface;
    message?: string;
    stderr?: string;
    compile_output?: string;
    time?: string;
    memory?: string;
}
