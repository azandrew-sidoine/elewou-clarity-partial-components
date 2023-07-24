import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import {
  RouteLink,
  RoutesMap,
  builLinkFromRoutesMap,
  IRouteLinkCollectionItem,
} from "src/app/lib/core/routes";
import { AbstractAlertableComponent } from "src/app/lib/core/helpers/component-interfaces";
import { AppUIStoreManager } from "src/app/lib/core/helpers/app-ui-store-manager.service";
import { backendRoutePaths, defaultPath, adminPath } from "../partials-configs";
import { Collection } from "src/app/lib/core/collections";
import { isDefined } from "src/app/lib/core/utils";

@Component({
  selector: "app-app-top-bar",
  templateUrl: "./app-top-bar.component.html",
  styles: [
    `
      .title {
        padding: 0 16px;
      }
      .header .branding,
      header .branding {
        padding: 0 0 0 1rem;
      }
      .app-logo {
        width: 20%;
      }
    `,
  ],
})
export class AppTopBarComponent
  extends AbstractAlertableComponent
  implements OnInit
{
  // public elewouLogo = '/assets/images/logo-elewou-main.png';
  public elewouLogo = "/assets/images/logo-elewou-main-dark.png";
  public elewouIcon = "/assets/images/icon-elewou.png";

  public navigationRoutes: Collection<RouteLink>;
  public routesIndexes: string[];
  public dashboardRoute = `/${defaultPath}`;
  @Input() profileRoute = `/${defaultPath}/${adminPath.accountRoute}`;

  @Input() routesMap: RoutesMap[];
  @Input() routeDescriptions: { [index: string]: string };
  @Input() moduleName: string;
  @Input() applicationName: string;
  @Input() username!: string;

  // #region Component outputs
  @Output() logout = new EventEmitter<boolean>();
  // #endregion Component outputs

  public modulesBackendRoute = backendRoutePaths.modules;

  constructor(public appUIStoreManager: AppUIStoreManager) {
    super(appUIStoreManager);
    this.navigationRoutes = new Collection();
  }

  ngOnInit(): void {
    this.routesIndexes = this.routesMap.map((route) => route.key);
    builLinkFromRoutesMap(this.routesMap, this.routeDescriptions).forEach(
      (item: IRouteLinkCollectionItem) =>
        this.navigationRoutes.add(item.key, item.value)
    );
  }

  /**
   * @description Checks if a given value is null or undefined
   * @param value [[value]]
   */
  public isDefined(value: any): boolean {
    return isDefined(value);
  }

  /**
   * @description Get [[RouteLink]] instance from the collection of RouteLink
   * @param key [[string]]
   */
  public getRouteLinkFromMap(key: string): RouteLink {
    return this.navigationRoutes.get(key);
  }

  async actionLogout(event: Event): Promise<void> {
    this.logout.emit(true);
    event?.preventDefault();
  }
}
