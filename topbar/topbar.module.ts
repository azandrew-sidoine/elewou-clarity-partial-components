import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AppTopBarComponent } from "./topbar.component";
import { ClarityModule } from "@clr/angular";
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [CommonModule, ClarityModule, RouterModule],
  declarations: [AppTopBarComponent],
  exports: [AppTopBarComponent],
})
export class TopBarModule {}
