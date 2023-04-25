import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {defaultEditorExtensions, TUI_EDITOR_EXTENSIONS} from "@taiga-ui/addon-editor";

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
}
