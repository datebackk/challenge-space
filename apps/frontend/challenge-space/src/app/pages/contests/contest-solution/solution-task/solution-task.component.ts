import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
    selector: 'challenge-space-solution-task',
    templateUrl: './solution-task.component.html',
    styleUrls: ['./solution-task.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SolutionTaskComponent {
    @Input()
    taskSettingsForm!: FormGroup;

    editorOptions = {theme: 'vs-dark', language: 'javascript'};
    code = 'function x() {\nconsole.log("Hello world!");\n}';

    activeItemIndex = 0;

    languages = ['JavaScript', 'Python'];

    languageControl = new FormControl(this.languages[0]);

    get taskName(): string {
        return this.taskSettingsForm.get('name')?.value;
    }

    get taskCondition(): string {
        return this.taskSettingsForm.get('condition')?.value;
    }
}
