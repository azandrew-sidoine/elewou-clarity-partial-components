import { Component, Inject, Input, OnDestroy, OnInit } from "@angular/core";
import { RoutesMap } from "../routes";
import { UIStateProvider, UI_STATE_PROVIDER } from "../ui-state";

@Component({
  selector: "azl-adm-dashboard",
  templateUrl: "./dashboard.component.html",
  styles: [
    `
      .container {
        margin: 16px;
      }
    `,
  ],
})
export class AzlDashboardComponent implements OnInit, OnDestroy {
  // Routes Mapping
  @Input() routesmaps: RoutesMap[] = [];
  // Routes definitions
  @Input() definitions = {} as Record<string, string>;

  /**
   * Defines the application name
   * @attr name
   */
  @Input() name!: string;

  /**
   * Defines the application module name
   *
   * @attr module
   */
  @Input() module!: string;

  /**
   * Defines the application company name
   *
   * @attr module
   */
  @Input() company!: string;

  constructor(@Inject(UI_STATE_PROVIDER) private uiState: UIStateProvider) {}

  ngOnInit() {
    this.uiState.endAction();
  }

  // tslint:disable-next-line: typedef
  ngOnDestroy() {}
}
