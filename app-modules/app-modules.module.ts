import { NgModule } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { CommonModule } from '@angular/common';
import { AppModulesComponent } from './app-modules.component';

@NgModule({
  exports: [
    AppModulesComponent
  ],
  declarations: [
    AppModulesComponent
  ],
  imports: [
    CommonModule,
    ClarityModule
  ],
  providers: []
})
export class AppModuleModule { }
