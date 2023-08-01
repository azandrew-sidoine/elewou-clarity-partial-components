import { TitleComponent } from './title/title.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { DatagridHeaderModule } from './datgrid-header/datagrid-header.module';
import { DetailedTablePreviewComponent } from './detailed-table-preview/detailed-table-preview.component';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    SharedModule,
    ScrollingModule
  ],
  exports: [
    // SidebarComponent,
    DatagridHeaderModule,
    DetailedTablePreviewComponent,
    TitleComponent
  ],
  declarations: [
    // SidebarComponent,
    DetailedTablePreviewComponent,
    TitleComponent
  ],
  providers: []
})
export class PartialsModule {

}
