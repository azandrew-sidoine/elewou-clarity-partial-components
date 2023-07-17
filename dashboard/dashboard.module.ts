import { NgModule } from "@angular/core";
import { AzlDashboardComponent } from "./dashboard.component";
import { CommonModule } from "@angular/common";
import { ClarityModule } from "@clr/angular";
import { TopBarModule } from "../topbar";
import { UIStateModule } from "../ui-state";

@NgModule({
  imports: [CommonModule, ClarityModule, TopBarModule, UIStateModule],
  exports: [AzlDashboardComponent],
  declarations: [AzlDashboardComponent],
})
export class AzlDashboardModule {}
