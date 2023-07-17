import { Component, Input } from "@angular/core";
import { interval } from "rxjs";
import { map, take } from "rxjs/operators";

@Component({
  selector: "app-components-loading",
  template: `
    <div class="outer-div" *ngIf="showUIElements">
      <div class="centered-loader">
        <span class="spinner spinner-inline"> </span>
        <span [translate]="'apploaderText'"> </span> <br />
        <span *ngIf="loadingCompleted$ | async">Redirecting ...</span>
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

  loadingCompleted$ = interval(500).pipe(
    take(1),
    map(() => true)
  );
}
