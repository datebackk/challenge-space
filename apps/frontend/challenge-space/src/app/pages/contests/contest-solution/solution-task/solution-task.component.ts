import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter, Inject,
    Input, OnChanges,
    OnInit,
    Output,
    SimpleChanges,
} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ISolution} from '../interfaces/solution.interface';
import {IJudge0Submission} from '../../../../shared/interfaces/judge0-submission.interface';
import {IContestTask} from '../../interfaces/contest-task.interface';
import {select, Store} from '@ngrx/store';
import {getTaskSolutionByTaskId} from '../../../../store/tokens/tokens.reducer';
import {distinctUntilChanged, Observable, takeUntil, timer} from 'rxjs';
import {IContestTaskSolution} from '../interfaces/contest-task-solution.interface';
import {loadTaskSolutions} from '../../../../store/tokens/tokens.actions';
import {judge0Languages} from '../../../../shared/constants/judge0-languages.const';
import {TuiDestroyService} from '@taiga-ui/cdk';
import {
    judge0LanguagesToVscodeLanguages
} from '../../../../shared/constants/judge0-languages-to-vscode-languages.const';
import {get} from 'lodash';
import {IContest} from '../../interfaces/contest.interface';
import {LOCAL_STORAGE} from '@ng-web-apis/common';
import {JSONParse} from '../../../../shared/utils/json-parse';

@Component({
    selector: 'challenge-space-solution-task',
    templateUrl: './solution-task.component.html',
    styleUrls: ['./solution-task.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [TuiDestroyService],
})
export class SolutionTaskComponent implements OnInit, OnChanges {
    @Input() contest!: IContest;
    @Input() taskSettingsForm!: FormGroup;
    @Input() isOwner!: boolean;
    @Input() isComplete!: boolean;
    @Input() codesSettingsForm!: FormGroup;
    @Input() taskIndex!: number;
    @Input() solution!: ISolution;
    @Input() task!: IContestTask;

    @Output() sendTaskSolution = new EventEmitter<{ contestId: number, solutionId: number, taskId: number, body: IJudge0Submission }>();
    @Output() completeSolution = new EventEmitter<void>();

    readonly intervalUpdate = timer(0, 6000).pipe(takeUntil(this.destroy$));

    taskSolution: Observable<IContestTaskSolution | undefined> = this.store.pipe(select(getTaskSolutionByTaskId));

    editorOptions = {theme: 'vs-dark', language: 'javascript'};
    code = '';

    activeItemIndex = 0;

    languages = judge0Languages;

    languageControl = new FormControl(this.languages[0]);

    constructor(
        private readonly store: Store,
        private readonly destroy$: TuiDestroyService,
        @Inject(LOCAL_STORAGE) private readonly storage: Storage,
    ) {}

    ngOnChanges({codesSettingsForm, isOwner, isComplete}: SimpleChanges): void {
        if (codesSettingsForm && codesSettingsForm.currentValue) {
            const settings = JSONParse(this.storage.getItem(String(this.contest.id)));

            const sourceCode = settings.find((setting: any) => setting.taskId === this.task.id)?.sourceCode || '';
            const languageId = settings.find((setting: any) => setting.taskId === this.task.id)?.languageId || judge0Languages[0].id;

            this.code = sourceCode;

            // @ts-ignore
            this.languageControl.setValue(judge0Languages.find(language => language.id === languageId));
            // @ts-ignore
            this.editorOptions = {...this.editorOptions, language: get(judge0LanguagesToVscodeLanguages, languageId), readOnly: false}
        }

        if (isOwner && isOwner.currentValue) {
            // @ts-ignore
            this.editorOptions = {...this.editorOptions, readOnly: true};
        }

        if (isComplete && isComplete.currentValue) {
            this.languageControl.disable();
            // @ts-ignore
            this.editorOptions = {...this.editorOptions, readOnly: true};
        }
    }

    get taskName(): string {
        return this.taskSettingsForm.get('name')?.value;
    }

    get taskDescription(): string {
        return this.taskSettingsForm.get('description')?.value;
    }

    get codeControl(): FormControl {
        return this.codesSettingsForm.get('sourceCode') as FormControl;
    }

    get codesSettingsFormLanguageControl(): FormControl {
        return this.codesSettingsForm.get('languageId') as FormControl;
    }

    ngOnInit(): void {
        this.intervalUpdate.subscribe(() => {
            this.store.dispatch(loadTaskSolutions(this.solution.id, this.task.id))
        });
        this.listenCodesSettingsFormLanguageControl();
        this.listenLanguageControl();
    }

    private listenCodesSettingsFormLanguageControl() {
        this.codesSettingsFormLanguageControl.valueChanges.pipe(distinctUntilChanged(), takeUntil(this.destroy$)).subscribe(languageId => {
           this.languageControl.setValue({id: languageId, name: ''});
        });
    }

    private listenLanguageControl(): void {
        // @ts-ignore
        this.languageControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((language: {id: number, name: string}) => {
            const strLanguageId = String(language.id);
            this.editorOptions = {...this.editorOptions, language: get(judge0LanguagesToVscodeLanguages, strLanguageId)}
        })
    }

    submitTaskSolution(): void {
        this.activeItemIndex = 1;
        this.sendTaskSolution.emit({
            solutionId: this.solution.id,
            contestId: this.contest.id,
            taskId: this.task.id,
            body: {
                // @ts-ignore
                language_id: this.languageControl.value.id,
                source_code: this.code,
            }
        });
    }
}
