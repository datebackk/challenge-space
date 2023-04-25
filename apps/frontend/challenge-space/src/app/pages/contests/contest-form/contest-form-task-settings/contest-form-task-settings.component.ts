import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
    selector: 'challenge-space-contest-form-task-settings',
    templateUrl: './contest-form-task-settings.component.html',
    styleUrls: ['./contest-form-task-settings.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContestFormTaskSettingsComponent {
    @Input()
    form!: FormGroup;
}
