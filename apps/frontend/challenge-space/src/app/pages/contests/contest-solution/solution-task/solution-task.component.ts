import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ISolution} from '../interfaces/solution.interface';
import {IJudge0Submission} from '../../../../shared/interfaces/judge0-submission.interface';
import {IContestTask} from '../../interfaces/contest-task.interface';
import {select, Store} from '@ngrx/store';
import {getTaskSolutionByTaskId} from '../../../../store/tokens/tokens.reducer';
import {Observable} from 'rxjs';
import {IContestTaskSolution} from '../interfaces/contest-task-solution.interface';
import {loadTaskSolutions} from '../../../../store/tokens/tokens.actions';

@Component({
    selector: 'challenge-space-solution-task',
    templateUrl: './solution-task.component.html',
    styleUrls: ['./solution-task.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SolutionTaskComponent implements OnInit {
    @Input() taskSettingsForm!: FormGroup;
    @Input() solution!: ISolution;
    @Input() task!: IContestTask;
    @Output() sendTaskSolution = new EventEmitter<{solutionId: number, taskId: number, body: IJudge0Submission}>();

    taskSolution: Observable<IContestTaskSolution| undefined> = this.store.pipe(select(getTaskSolutionByTaskId, this.task.id));

    editorOptions = {theme: 'vs-dark', language: 'javascript'};
    code = 'function x() {\nconsole.log("Hello world!");\n}';

    activeItemIndex = 0;

    languages = ['JavaScript', 'Python'];

    languageControl = new FormControl(this.languages[0]);

    constructor(private readonly store: Store) {
    }

    get taskName(): string {
        return this.taskSettingsForm.get('name')?.value;
    }

    get taskDescription(): string {
        return this.taskSettingsForm.get('description')?.value;
    }

    ngOnInit(): void {
        this.store.dispatch(loadTaskSolutions(this.solution.id, this.task.id));
    }

    submitTaskSolution() {
        this.sendTaskSolution.emit({
            solutionId: this.solution.id,
            taskId: this.task.id,
            body: {
                language_id: 92,
                source_code: this.code,
            }
        });
    }
}
