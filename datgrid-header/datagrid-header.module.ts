import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ClarityModule } from "@clr/angular";
import { DatgridHeaderComponent } from "./datgrid-header.component";

@NgModule({
  imports: [CommonModule, ClarityModule],
  declarations: [DatgridHeaderComponent],
  exports: [DatgridHeaderComponent],
})
export class DatagridHeaderModule {}
