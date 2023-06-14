import {ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TUI_EDITOR_EXTENSIONS} from '@taiga-ui/addon-editor';
import {editorExtensions} from '../../../../shared/constants/editor-extensions.const';

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
export class ContestFormTaskSettingsComponent implements OnChanges {
    @Input()
    form!: FormGroup;

    activeItemIndex = 0;

    readonly testCaseForm = {
        input: [null, Validators.required],
        output: [null, Validators.required],
    };

    constructor(private readonly formBuilder: FormBuilder) {}

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
        this.testCasesFormArray.removeAt(index);
    }

    onTestCaseAdd(): void {
        this.testCasesFormArray.push(this.formBuilder.group(this.testCaseForm));
    }

    ngOnChanges({form}: SimpleChanges): void {
    }
}
