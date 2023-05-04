import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MonacoEditorModule, NGX_MONACO_EDITOR_CONFIG} from 'ngx-monaco-editor-v2';

import {monacoEditorConfig} from '../../../shared/constants/monaco-editor-config.const';
import {ContestSolutionComponent} from './contest-solution.component';
import {ContestSolutionRoutingModule} from './contest-solution-routing.module';

@NgModule({
    declarations: [ContestSolutionComponent],
    imports: [
        CommonModule,
        ContestSolutionRoutingModule,
        MonacoEditorModule,
        FormsModule,
    ],
    providers: [
        {
            provide: NGX_MONACO_EDITOR_CONFIG,
            useValue: monacoEditorConfig,
        },
    ],
})
export class ContestSolutionModule {}
