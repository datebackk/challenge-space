import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {tuiMarkControlAsTouchedAndValidate} from '@taiga-ui/cdk';
import {Observable} from 'rxjs';

import {LoadingStatus} from '../../../shared/enums/loading-status.enum';
import {createContest} from '../../../store/contests/contests.actions';
import {getCreateContestLoadingStatus} from '../../../store/contests/contests.reducer';
import {IContestWithoutId} from '../interfaces/contest-without-id.interface';

@Component({
    selector: 'challenge-space-contest-form',
    templateUrl: './contest-form.component.html',
    styleUrls: ['./contest-form.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContestFormComponent {
    activeItemIndex = 0;
    steps = ['Настройки', 'Задача 1'];

    readonly createContestLoadingStatus: Observable<LoadingStatus> = this.store.pipe(
        select(getCreateContestLoadingStatus),
    );

    readonly testCaseForm = {
        input: [null, Validators.required],
        output: [null, Validators.required],
    };

    readonly taskForm = {
        name: [null, Validators.required],
        description: [null, Validators.required],
        testCases: this.formBuilder.array([this.formBuilder.group(this.testCaseForm)]),
    };

    readonly form = this.formBuilder.group({
        mainSettings: this.formBuilder.group({
            name: [null, Validators.required],
            description: [null, Validators.required],
            interval: this.formBuilder.group({
                startDate: [null, Validators.required],
                endDate: [null, Validators.required],
            }),
            duration: [null, Validators.required],
        }),
        tasks: this.formBuilder.array([this.formBuilder.group(this.taskForm)]),
    });

    get mainSettingsFormGroup(): FormGroup {
        return this.form.get('mainSettings') as FormGroup;
    }

    get tasksFormArray(): FormArray {
        return this.form.get('tasks') as FormArray;
    }

    get tasksFormArrayControls(): FormGroup[] {
        return this.tasksFormArray.controls as FormGroup[];
    }

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly store: Store,
    ) {}

    shouldShowLoader(loadingStatus: LoadingStatus): boolean {
        return loadingStatus === LoadingStatus.Loading;
    }

    onDeleteTask(): void {
        this.tasksFormArray.removeAt(this.activeItemIndex);
        this.steps.splice(this.activeItemIndex, 1);
        this.steps = this.steps.map((value, index) => {
            if (index === 0) {
                return value;
            }

            return `Задача ${index + 1}`;
        });

        if (this.steps.length === this.activeItemIndex) {
            this.activeItemIndex -= 1;
        }
    }

    onAddTask(): void {
        const taskName = `Задача ${this.tasksFormArray.controls.length + 1}`;

        this.tasksFormArray.push(this.formBuilder.group({...this.taskForm, testCases: this.formBuilder.array([this.formBuilder.group(this.testCaseForm)])}));
        this.steps.push(taskName);
    }

    onSubmit(): void {
        console.log(this.form.getRawValue());

        if (this.form.invalid) {
            tuiMarkControlAsTouchedAndValidate(this.form);

            return;
        }

        this.store.dispatch(
            createContest(this.form.getRawValue() as unknown as IContestWithoutId),
        );
    }
}
