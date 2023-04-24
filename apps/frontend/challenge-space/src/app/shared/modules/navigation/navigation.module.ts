import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation.component';
import {TuiButtonModule, TuiDataListModule, TuiHostedDropdownModule, TuiSvgModule} from "@taiga-ui/core";
import {TuiAvatarModule, TuiTabsModule} from "@taiga-ui/kit";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    NavigationComponent
  ],
  exports: [
    NavigationComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TuiSvgModule,
    TuiTabsModule,
    TuiButtonModule,
    TuiAvatarModule,
    TuiDataListModule,
    TuiHostedDropdownModule
  ]
})
export class NavigationModule { }
