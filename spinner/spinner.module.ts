import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { OverlayComponent } from "./overlay.component";
import { SpinnerComponent } from "./spinner.component";

@NgModule({
  imports: [CommonModule],
  declarations: [SpinnerComponent, OverlayComponent],
  exports: [SpinnerComponent, OverlayComponent],
})
export class SpinnerModule {}
