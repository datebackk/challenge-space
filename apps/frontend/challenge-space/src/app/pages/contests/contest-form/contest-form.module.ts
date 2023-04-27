import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {TuiEditorModule, TuiEditorSocketModule} from '@taiga-ui/addon-editor';
import {TuiButtonModule, TuiTextfieldControllerModule} from '@taiga-ui/core';
import {
    TuiInputCountModule,
    TuiInputDateTimeModule,
    TuiInputModule,
    TuiStepperModule,
    TuiTabsModule,
    TuiTextAreaModule,
} from '@taiga-ui/kit';

import {ContestFormComponent} from './contest-form.component';
import {ContestFormMainSettingsComponent} from './contest-form-main-settings/contest-form-main-settings.component';
import {ContestFormRotingModule} from './contest-form-roting.module';
import {ContestFormTaskSettingsComponent} from './contest-form-task-settings/contest-form-task-settings.component';

@NgModule({
    declarations: [
        ContestFormComponent,
        ContestFormMainSettingsComponent,
        ContestFormTaskSettingsComponent,
    ],
    exports: [ContestFormComponent],
    imports: [
        CommonModule,
        ContestFormRotingModule,
        TuiStepperModule,
        ReactiveFormsModule,
        TuiInputModule,
        TuiTextAreaModule,
        TuiInputCountModule,
        TuiTextfieldControllerModule,
        TuiInputDateTimeModule,
        TuiEditorModule,
        TuiButtonModule,
        TuiTabsModule,
        TuiEditorSocketModule,
    ],
})
export class ContestFormModule {}
