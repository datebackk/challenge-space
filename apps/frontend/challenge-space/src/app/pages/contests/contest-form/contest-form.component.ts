import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
    selector: 'challenge-space-contest-form',
    templateUrl: './contest-form.component.html',
    styleUrls: ['./contest-form.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContestFormComponent {
    readonly steps = ['Start Up', 'Cash In', 'Sell Out', 'Bro Down'];
    activeItemIndex = 0;

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

    constructor(private readonly formBuilder: FormBuilder) {}
}
