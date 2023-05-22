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
import {Observable, takeUntil} from 'rxjs';
import {IContestTaskSolution} from '../interfaces/contest-task-solution.interface';
import {loadTaskSolutions} from '../../../../store/tokens/tokens.actions';
import {judge0Languages} from '../../../../shared/constants/judge0-languages.const';
import {TuiDestroyService} from '@taiga-ui/cdk';
import {
    judge0LanguagesToVscodeLanguages
} from '../../../../shared/constants/judge0-languages-to-vscode-languages.const';
import {get} from 'lodash';

@Component({
    selector: 'challenge-space-solution-task',
    templateUrl: './solution-task.component.html',
    styleUrls: ['./solution-task.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [TuiDestroyService],
})
export class SolutionTaskComponent implements OnInit {
    @Input() taskSettingsForm!: FormGroup;
    @Input() solution!: ISolution;
    @Input() task!: IContestTask;
    @Output() sendTaskSolution = new EventEmitter<{solutionId: number, taskId: number, body: IJudge0Submission}>();

    taskSolution: Observable<IContestTaskSolution | undefined> = this.store.pipe(select(getTaskSolutionByTaskId));

    editorOptions = {theme: 'vs-dark', language: 'javascript'};
    code = 'function x() {\nconsole.log("Hello world!");\n}';

    activeItemIndex = 0;

    languages = judge0Languages;

    languageControl = new FormControl(this.languages[0]);

    constructor(private readonly store: Store, private readonly destroy$: TuiDestroyService) {}

    get taskName(): string {
        return this.taskSettingsForm.get('name')?.value;
    }

    get taskDescription(): string {
        return this.taskSettingsForm.get('description')?.value;
    }

    ngOnInit(): void {
        this.store.dispatch(loadTaskSolutions(this.solution.id, this.task.id));
        this.listenLanguageControl();
    }

    private listenLanguageControl(): void {
        // @ts-ignore
        this.languageControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((language: {id: number, name: string}) => {
            const strLanguageId = String(language.id);
            this.editorOptions = {...this.editorOptions, language: get(judge0LanguagesToVscodeLanguages, strLanguageId)}
        })
    }

    submitTaskSolution(): void {
        this.sendTaskSolution.emit({
            solutionId: this.solution.id,
            taskId: this.task.id,
            body: {
                // @ts-ignore
                language_id: this.languageControl.value.id,
                source_code: this.code,
            }
        });
    }
}
