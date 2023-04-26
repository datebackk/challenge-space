import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {tuiMarkControlAsTouchedAndValidate} from '@taiga-ui/cdk';
import {TuiStepState} from '@taiga-ui/kit';

@Component({
    selector: 'challenge-space-contest-form',
    templateUrl: './contest-form.component.html',
    styleUrls: ['./contest-form.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContestFormComponent {
    activeItemIndex = 0;
    steps = ['Настройки', 'Задача 1'];

    readonly testCaseForm = {
        input: [null, Validators.required],
        output: [null, Validators.required],
    };

    readonly taskForm = {
        name: [null, Validators.required],
        condition: [null, Validators.required],
        testCases: this.formBuilder.array([this.formBuilder.group(this.testCaseForm)]),
    };

    readonly form = this.formBuilder.array([
        this.formBuilder.group({
            name: [null, Validators.required],
            description: [null, Validators.required],
            interval: this.formBuilder.group({
                startDate: [null, Validators.required],
                endDate: [null, Validators.required],
            }),
            time: [null, Validators.required],
            complexity: [null, Validators.required],
        }),
        this.formBuilder.group(this.taskForm),
    ]);

    get stepState(): TuiStepState {
        const formGroup = this.form.controls[this.activeItemIndex];
        const isPass = formGroup.valid;
        const isError = formGroup.invalid && formGroup.touched;

        if (isPass) {
            return 'pass';
        }

        if (isError) {
            return 'error';
        }

        return 'normal';
    }

    constructor(private readonly formBuilder: FormBuilder) {}

    onDeleteTask(): void {
        this.form.removeAt(this.activeItemIndex);
        this.steps.splice(this.activeItemIndex, 1);
        this.steps = this.steps.map((value, index) => {
            if (index === 0) {
                return value;
            }

            return `Задача ${index + 1}`;
        });
    }

    onAddTask(): void {
        const taskName = `Задача ${this.form.controls.length}`;

        this.form.push(this.formBuilder.group(this.taskForm));
        this.steps.push(taskName);
    }

    onSubmit(): void {
        if (this.form.invalid) {
            tuiMarkControlAsTouchedAndValidate(this.form);
        }
    }
}
