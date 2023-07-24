import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-components-loading",
  template: `
    <div class="outer-div" *ngIf="showUIElements">
      <div class="centered-loader">
        <span class="spinner spinner-inline"> </span>
        <span [translate]="'apploaderText'"> </span> <br />
      </div>
    </div>
  `,
  styles: [
    `
      .outer-div {
        margin: 25% auto;
        width: 25rem;
      }
    `,
  ],
})
export class AppComponentsLoadingComponent {
  // tslint:disable-next-line: no-inferrable-types
  @Input() showUIElements: boolean = true;
  @Output() isAuthenticated: EventEmitter<boolean> = new EventEmitter();
}
