import { Component, OnInit, Input } from "@angular/core";
import {
  RouteLink,
  RoutesMap,
  builLinkFromRoutesMap,
  IRouteLinkCollectionItem,
} from "src/app/lib/core/routes";
import { AbstractAlertableComponent } from "src/app/lib/core/helpers/component-interfaces";
import { AppUIStoreManager } from "src/app/lib/core/helpers/app-ui-store-manager.service";
import { Collection } from "src/app/lib/core/collections";
import { TypeUtilHelper } from "../../../core/helpers/type-utils-helper";
import { defaultPath } from "../partials-configs";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styles: [],
})
export class SidebarComponent
  extends AbstractAlertableComponent
  implements OnInit
{
  public navigationRoutes: Collection<RouteLink>;
  public routesIndexes: string[];
  @Input() routesMap: RoutesMap[];
  @Input() routeDescriptions: { [index: string]: string };
  public elewouIcon =
    "https://scontent.flfw1-1.fna.fbcdn.net/v/t1.0-9/129900309_3678495065550810_1722521212220721187_n.jpg?_nc_cat=102&ccb=3&_nc_sid=730e14&_nc_ohc=Jhfz9EmsyaMAX8BGeyd&_nc_ht=scontent.flfw1-1.fna&oh=1dafd888c9388daa883f12ebd42ceeca&oe=604B2045";

  public dashboardRoute = `/${defaultPath}`;

  @Input() public moduleName: string;
  @Input() public applicationName: string;

  constructor(
    public appUIStoreManager: AppUIStoreManager,
    public readonly typeHelper: TypeUtilHelper
  ) {
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

  isFirstRoute(routes: RoutesMap[], item: RoutesMap): boolean {
    return routes.indexOf(item) === 0;
  }

  /**
   * @description Get [[RouteLink]] instance from the collection of RouteLink
   * @param key [[string]]
   */
  public getRouteLinkFromMap(key: string): RouteLink {
    return this.navigationRoutes.get(key);
  }
}
