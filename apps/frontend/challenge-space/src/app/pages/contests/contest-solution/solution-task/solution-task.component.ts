import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {SolutionsApiService} from '../../../../api/solutions/solutions.api.service';
import {ISolution} from '../interfaces/solution.interface';

@Component({
    selector: 'challenge-space-solution-task',
    templateUrl: './solution-task.component.html',
    styleUrls: ['./solution-task.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SolutionTaskComponent {
    @Input() taskSettingsForm!: FormGroup;

    @Input() solution!: ISolution;

    editorOptions = {theme: 'vs-dark', language: 'javascript'};
    code = 'function x() {\nconsole.log("Hello world!");\n}';

    activeItemIndex = 0;

    languages = ['JavaScript', 'Python'];

    languageControl = new FormControl(this.languages[0]);

    constructor(private readonly solutionsApiService: SolutionsApiService) {
    }

    get taskName(): string {
        return this.taskSettingsForm.get('name')?.value;
    }

    get taskDescription(): string {
        return this.taskSettingsForm.get('description')?.value;
    }

    submitTaskSolution() {
        this.solutionsApiService.submitTaskSolution(
            this.solution.id,
            {
                language_id: 92,
                source_code: this.code,
            },
            {
                taskId: 1
            }
        ).subscribe()
    }
}
