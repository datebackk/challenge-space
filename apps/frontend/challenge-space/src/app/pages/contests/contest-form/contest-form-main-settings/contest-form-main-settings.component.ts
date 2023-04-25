import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
    selector: 'challenge-space-contest-form-main-settings',
    templateUrl: './contest-form-main-settings.component.html',
    styleUrls: ['./contest-form-main-settings.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContestFormMainSettingsComponent {
    @Input()
    form!: FormGroup;

    get intervalFormGroup(): FormGroup {
        return this.form.get('interval') as FormGroup;
    }
}
