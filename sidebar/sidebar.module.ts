import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SidebarComponent } from "./sidebar.component";
import { ClarityModule } from "@clr/angular";

@NgModule({
  imports: [CommonModule, ClarityModule],
  exports: [SidebarComponent],
  declarations: [SidebarComponent],
  providers: [],
})
export class SidebarModule {}
