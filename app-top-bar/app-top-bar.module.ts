import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ClarityModule } from "@clr/angular";
import { AppTopBarComponent } from "./app-top-bar.component";
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [CommonModule, ClarityModule, RouterModule],
  declarations: [AppTopBarComponent],
  exports: [AppTopBarComponent],
})
export class AppTopBarModule {}
