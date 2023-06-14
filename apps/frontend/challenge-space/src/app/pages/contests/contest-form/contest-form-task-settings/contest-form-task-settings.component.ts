import {ChangeDetectionStrategy, Component, Inject, Injector, Input} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TUI_EDITOR_EXTENSIONS} from '@taiga-ui/addon-editor';
import {editorExtensions} from '../../../../shared/constants/editor-extensions.const';
import {TuiDialogService} from '@taiga-ui/core';
import {PromptDialogComponent} from '../../../../shared/modules/prompt-dialog/prompt-dialog.component';
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus';
import {filter} from 'rxjs';

@Component({
    selector: 'challenge-space-contest-form-task-settings',
    templateUrl: './contest-form-task-settings.component.html',
    styleUrls: ['./contest-form-task-settings.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: TUI_EDITOR_EXTENSIONS,
            useValue: editorExtensions,
        },
    ],
})
export class ContestFormTaskSettingsComponent {
    @Input()
    form!: FormGroup;

    activeItemIndex = 0;

    readonly testCaseForm = {
        input: [null, Validators.required],
        output: [null, Validators.required],
    };

    private readonly dialog = this.dialogs.open<number>(
        new PolymorpheusComponent(PromptDialogComponent, this.injector),
        {
            label: 'Удалить тест кейс?',
        },
    );

    constructor(private readonly formBuilder: FormBuilder,
                @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
                @Inject(Injector) private readonly injector: Injector,
                ) {}

    get descriptionFormControl(): FormControl {
        return this.form.get('description') as FormControl;
    }

    get testCasesFormArray(): FormArray {
        return this.form.get('testCases') as FormArray;
    }

    get testCasesFormArrayControls(): FormGroup[] {
        return this.testCasesFormArray.controls as FormGroup[];
    }

    onDeleteTestCase(index: number): void {
        this.dialog.pipe(filter(Boolean)).subscribe(() => {
            this.testCasesFormArray.removeAt(index);
        });
    }

    onTestCaseAdd(): void {
        this.testCasesFormArray.push(this.formBuilder.group(this.testCaseForm));
    }
}
