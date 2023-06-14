import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {IContestResults} from '../../interfaces/contest-results.interface';
import {judge0Languages} from '../../../../shared/constants/judge0-languages.const';
import {get} from 'lodash';
import {
    judge0LanguagesToVscodeLanguages
} from '../../../../shared/constants/judge0-languages-to-vscode-languages.const';
import {ITask} from '../../../../../../../../backend/challenge-space-api/src/app/task/interfaces/task.interface';
import {judge0SubmissionSuccessStatuses} from '../../../../shared/constants/judge0-submission-success-statuses.const';
import {IUser} from '../../../../shared/interfaces/user.interface';

@Component({
    selector: 'challenge-space-contest-results',
    templateUrl: './contest-results.component.html',
    styleUrls: ['./contest-results.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContestResultsComponent {
    @Input() contestResults!: IContestResults | null;
    @Input() isOwner!: boolean;
    @Input() isComplete!: boolean;
    @Input() isFinished!: boolean;

    @Output() selectWinner = new EventEmitter<IUser>();

    activeItemIndex = 0;
    activeSubItemIndex = 0;

    editorOptions = {theme: 'vs-dark', language: 'javascript', readOnly: true};

    readonly judge0Languages = judge0Languages;

    onSelectWinner(user: IUser): void {
        this.selectWinner.emit(user);
    }

    getAndUpdateLanguageOptions(languageId: number): string | undefined {
        this.editorOptions = {...this.editorOptions, language: get(judge0LanguagesToVscodeLanguages, languageId)}

        return this.judge0Languages.find(language => language.id === languageId)?.name;
    }

    getSolvedTasks(tasks: ITask[]): string {
        const tasksAmount = tasks.length;

        let fullTaskPassed = 0;

        tasks.forEach(task => {
            let testCasesSolved = 0;
            task.testCases.forEach(testCase => {
                // @ts-ignore
                if (testCase.result?.result?.submissions[0]) {
                    // @ts-ignore
                    testCasesSolved += this.isPassed(testCase.result?.result?.submissions[0]) ? 1 : 0
                }

                fullTaskPassed += testCasesSolved === task.testCases.length ? 1: 0;
            });
        });

        return `${fullTaskPassed}/${tasksAmount}`;
    }

    getSolvedTestCases(tasks: ITask[]): string {
        let testCasesAmount = 0;
        let passedTestCasesAmount = 0;

        tasks.forEach(task => {
            testCasesAmount += task.testCases.length;

            task.testCases.forEach(testCase => {
                // @ts-ignore
                if (testCase.result?.result?.submissions[0]) {
                    // @ts-ignore
                    passedTestCasesAmount += this.isPassed(testCase.result?.result?.submissions[0]) ? 1 : 0
                }
            });
        });

        return `${passedTestCasesAmount}/${testCasesAmount}`;
    }

    private isPassed(result: any): boolean {
        return result?.status?.id ? result?.status.id in judge0SubmissionSuccessStatuses : false
    }
}
