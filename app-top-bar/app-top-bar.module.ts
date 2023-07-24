import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ClarityModule } from "@clr/angular";
import { AppTopBarComponent } from "./app-top-bar.component";

@NgModule({
  imports: [CommonModule, ClarityModule],
  declarations: [AppTopBarComponent],
  exports: [AppTopBarComponent],
})
export class AppTopBarModule {}
