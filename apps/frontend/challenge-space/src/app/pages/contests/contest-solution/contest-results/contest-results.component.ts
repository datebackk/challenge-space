import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {IContestResults} from '../../interfaces/contest-results.interface';
import {judge0Languages} from '../../../../shared/constants/judge0-languages.const';
import {get} from 'lodash';
import {
    judge0LanguagesToVscodeLanguages
} from '../../../../shared/constants/judge0-languages-to-vscode-languages.const';

@Component({
    selector: 'challenge-space-contest-results',
    templateUrl: './contest-results.component.html',
    styleUrls: ['./contest-results.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContestResultsComponent {
    @Input() contestResults!: IContestResults | null;

    activeItemIndex = 0;
    activeSubItemIndex = 0;

    editorOptions = {theme: 'vs-dark', language: 'javascript', readOnly: true};

    readonly judge0Languages = judge0Languages;

    getAndUpdateLanguageOptions(languageId: number): string | undefined {
        this.editorOptions = {...this.editorOptions, language: get(judge0LanguagesToVscodeLanguages, languageId)}

        return this.judge0Languages.find(language => language.id === languageId)?.name;
    }
}
