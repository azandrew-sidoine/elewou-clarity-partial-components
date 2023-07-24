import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SidebarComponent } from "./sidebar.component";
import { ClarityModule } from "@clr/angular";
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [CommonModule, ClarityModule, RouterModule],
  exports: [SidebarComponent],
  declarations: [SidebarComponent],
  providers: [],
})
export class SidebarModule {}
