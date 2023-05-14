import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';

import {contestMock} from '../mocks/contest.mock';

@Component({
    selector: 'challenge-space-contest-solution',
    templateUrl: './contest-solution.component.html',
    styleUrls: ['./contest-solution.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContestSolutionComponent implements OnInit {
    activeItemIndex = 0;

    readonly contestSolutionForm = this.formBuilder.group({
        mainSettings: this.formBuilder.group({}),
        tasks: this.formBuilder.array([]),
    });

    constructor(private readonly formBuilder: FormBuilder) {}

    get tasksFormArray(): FormArray {
        return this.contestSolutionForm.get('tasks') as FormArray;
    }

    get tasksFormArrayControls(): FormGroup[] {
        return this.tasksFormArray.controls as FormGroup[];
    }

    ngOnInit(): void {
        this.tasksFormArray.clear();
        contestMock.tasks.forEach(task => {
            this.tasksFormArray.push(this.formBuilder.group(task));
        });
    }
}
