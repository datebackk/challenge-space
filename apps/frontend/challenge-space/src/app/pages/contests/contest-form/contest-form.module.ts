import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {TuiTextfieldControllerModule} from '@taiga-ui/core';
import {
    TuiInputCountModule,
    TuiInputDateTimeModule,
    TuiInputModule,
    TuiStepperModule,
    TuiTextAreaModule,
} from '@taiga-ui/kit';

import {ContestFormComponent} from './contest-form.component';
import {ContestFormMainSettingsComponent} from './contest-form-main-settings/contest-form-main-settings.component';
import {ContestFormRotingModule} from './contest-form-roting.module';
import {ContestFormTaskSettingsComponent} from './contest-form-task-settings/contest-form-task-settings.component';
import {TuiEditorModule} from "@taiga-ui/addon-editor";

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
    ],
})
export class ContestFormModule {}
