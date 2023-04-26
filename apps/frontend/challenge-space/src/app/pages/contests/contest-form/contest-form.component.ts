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

    readonly taskForm = this.formBuilder.group({
        name: [null, Validators.required],
        condition: [null, Validators.required],
        example: this.formBuilder.array([]),
    });

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
        this.taskForm,
    ]);

    get stepState(): TuiStepState {
        return this.form.controls[this.activeItemIndex].valid ? 'pass' : 'error';
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

        this.form.push(this.taskForm);
        this.steps.push(taskName);
    }

    onSubmit(): void {
        if (this.form.invalid) {
            tuiMarkControlAsTouchedAndValidate(this.form);
        }
    }
}
