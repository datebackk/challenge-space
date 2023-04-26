import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {defaultEditorExtensions, TUI_EDITOR_EXTENSIONS} from '@taiga-ui/addon-editor';

@Component({
    selector: 'challenge-space-contest-form-task-settings',
    templateUrl: './contest-form-task-settings.component.html',
    styleUrls: ['./contest-form-task-settings.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: TUI_EDITOR_EXTENSIONS,
            useValue: defaultEditorExtensions,
        },
    ],
})
export class ContestFormTaskSettingsComponent {
    @Input()
    form!: FormGroup;

    readonly testCaseForm = {
        input: [null, Validators.required],
        output: [null, Validators.required],
    };

    constructor(private readonly formBuilder: FormBuilder) {}

    get testCasesFormArray(): FormArray {
        return this.form.get('testCases') as FormArray;
    }

    get testCasesFormArrayControls(): FormGroup[] {
        return this.testCasesFormArray.controls as FormGroup[];
    }

    onDeleteTestCase(index: number): void {
        this.testCasesFormArray.removeAt(index);
    }

    onTestCaseAdd(): void {
        this.testCasesFormArray.push(this.formBuilder.group(this.testCaseForm));
    }
}
