import {Component} from '@angular/core';

@Component({
    selector: 'challenge-space-contest-solution',
    templateUrl: './contest-solution.component.html',
    styleUrls: ['./contest-solution.component.less'],
})
export class ContestSolutionComponent {
    editorOptions = {theme: 'vs-dark', language: 'javascript'};
    code: string= 'function x() {\nconsole.log("Hello world!");\n}';
}
