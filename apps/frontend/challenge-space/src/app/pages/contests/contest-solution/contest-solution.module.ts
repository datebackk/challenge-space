import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TuiEditorSocketModule} from '@taiga-ui/addon-editor';
import {TuiButtonModule} from '@taiga-ui/core';
import {
    TuiBadgeModule,
    TuiDataListWrapperModule, TuiIslandModule,
    TuiSelectModule,
    TuiStepperModule,
    TuiTabsModule,
} from '@taiga-ui/kit';
import {MonacoEditorModule, NGX_MONACO_EDITOR_CONFIG} from 'ngx-monaco-editor-v2';

import {monacoEditorConfig} from '../../../shared/constants/monaco-editor-config.const';
import {ContestSolutionComponent} from './contest-solution.component';
import {ContestSolutionRoutingModule} from './contest-solution-routing.module';
import {SolutionTaskComponent} from './solution-task/solution-task.component';
import {SolutionWelcomeComponent} from './solution-welcome/solution-welcome.component';
import {TuiLetModule} from '@taiga-ui/cdk';
import {SolutionTaskOutputComponent} from './solution-task-output/solution-task-output.component';

@NgModule({
    declarations: [
        ContestSolutionComponent,
        SolutionTaskComponent,
        SolutionWelcomeComponent,
        SolutionTaskOutputComponent,
    ],
    imports: [
        CommonModule,
        ContestSolutionRoutingModule,
        MonacoEditorModule,
        FormsModule,
        TuiEditorSocketModule,
        ReactiveFormsModule,
        TuiTabsModule,
        TuiStepperModule,
        TuiSelectModule,
        TuiDataListWrapperModule,
        TuiBadgeModule,
        TuiButtonModule,
        TuiLetModule,
        TuiIslandModule,
    ],
    providers: [
        {
            provide: NGX_MONACO_EDITOR_CONFIG,
            useValue: monacoEditorConfig,
        },
    ],
})
export class ContestSolutionModule {}
