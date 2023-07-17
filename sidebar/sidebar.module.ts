import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ClarityModule } from "@clr/angular";
import { RouterModule } from "@angular/router";
import { SidebarComponent } from "./sidebar.component";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  imports: [CommonModule, ClarityModule, RouterModule, TranslateModule],
  declarations: [SidebarComponent],
  exports: [SidebarComponent],
})
export class SidebarModule {}
