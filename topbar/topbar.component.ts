import { Component, OnInit, Input } from "@angular/core";
import {
  RouteLink,
  RoutesMap,
  routeMapToLink,
  RouteLinkCollectionItemInterface,
} from "src/app/lib/core/routes";
import { defaultPath, commonRoutes } from "../partials-configs";
import { Collection } from "src/app/lib/core/collections";
import { isDefined } from "src/app/lib/core/utils";
import { AppUIStateProvider } from "src/app/lib/core/ui-state";

@Component({
  selector: "app-top-bar",
  templateUrl: "./topbar.component.html",
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
export class AppTopBarComponent implements OnInit {
  // public elewouLogo = '/assets/images/logo-elewou-main.png';
  public elewouLogo = "/assets/images/logo-elewou-main-dark.png";
  public elewouIcon = "/assets/images/icon-elewou.png";

  public navigationRoutes: Collection<RouteLink>;
  public routesIndexes!: string[];
  public dashboardRoute = `/${defaultPath}`;
  public profileRoute = `/${defaultPath}/${commonRoutes.settings}`;

  @Input() public routesMap!: RoutesMap[];
  @Input() routeDescriptions!: { [index: string]: string };
  @Input() public moduleName!: string;
  @Input() public applicationName!: string;
  @Input() public companyName!: string;

  constructor(public uiState: AppUIStateProvider) {
    this.navigationRoutes = new Collection();
  }

  ngOnInit(): void {
    this.routesIndexes = this.routesMap.map((route) => route.key);
    routeMapToLink(this.routesMap, this.routeDescriptions).forEach(
      (item: RouteLinkCollectionItemInterface) =>
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
}
