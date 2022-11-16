import { TitleComponent } from './title/title.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared.module';
import { AppTopBarComponent } from './app-top-bar/app-top-bar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { AppModuleModule } from './app-modules/app-modules.module';
import { DatagridHeaderModule } from './datgrid-header/datagrid-header.module';
import { DetailedTablePreviewComponent } from './detailed-table-preview/detailed-table-preview.component';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    SharedModule,
    ScrollingModule,
    AppModuleModule
  ],
  exports: [
    AppTopBarComponent,
    SidebarComponent,
    AppModuleModule,
    DatagridHeaderModule,
    DetailedTablePreviewComponent,
    TitleComponent
  ],
  declarations: [
    AppTopBarComponent,
    SidebarComponent,
    DetailedTablePreviewComponent,
    TitleComponent
  ],
  providers: []
})
export class PartialsModule {

}
