import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {NavigationModule} from './modules/navigation/navigation.module';
import {PromptDialogModule} from './modules/prompt-dialog/prompt-dialog.module';

@NgModule({
    declarations: [],
    imports: [CommonModule, NavigationModule, PromptDialogModule],
})
export class SharedModule {}
