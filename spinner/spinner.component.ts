import { Component, Input } from "@angular/core";

@Component({
  selector: "ngx-spinner",
  template: `<div [ngClass]="cssClass"></div>`,
  styleUrls: ["./spinner.component.css"],
})
export class SpinnerComponent {
  /**
   * @attr size
   */
  @Input()
  size!: "small" | "medium";

  /**
   * @attr basic
   */
  @Input()
  basic!: boolean;

  get cssClass() {
    return this.size
      ? {
          [this.size]: true,
          ["ngx-spinner-basic"]: this.basic ? true : false,
          ["ngx-spinner"]: true,
        }
      : {
          ["ngx-spinner-basic"]: this.basic ? true : false,
          ["ngx-spinner"]: this.basic ? false : true,
        };
  }
}
