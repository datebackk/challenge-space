import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PromptDialogComponent} from './prompt-dialog.component';
import {TuiButtonModule} from '@taiga-ui/core';

@NgModule({
    declarations: [PromptDialogComponent],
    imports: [CommonModule, TuiButtonModule],
})
export class PromptDialogModule {}
