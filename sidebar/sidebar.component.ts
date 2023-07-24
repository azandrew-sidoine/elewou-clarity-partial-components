import { Component, Input } from "@angular/core";
import {
  RouteLink,
  RoutesMap,
  routeMapToLink,
  RouteLinkCollectionItemInterface,
} from "src/app/lib/core/routes";
import { Collection } from "src/app/lib/core/collections";
import { TypeUtilHelper } from "../../../core/helpers/type-utils-helper";
import { map } from "rxjs/operators";
import { defaultPath, commonRoutes } from "../partials-configs";
import { AppUIStateProvider } from "src/app/lib/core/ui-state";
import { createStateful } from "src/app/lib/core/rxjs/helpers";
import { combineLatest } from "rxjs";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styles: [
    `
      :host ::ng-deep .clr-vertical-nav {
        min-height: 100%;
        height: 100%;
      }
    `,
  ],
})
export class SidebarComponent {
  @Input() set routesMap(value: RoutesMap[]) {
    if (value) {
      this._routesMap$.next(value);
    }
  }
  @Input() routeDescriptions!: { [index: string]: string };

  public dashboardRoute = `/${defaultPath}`;
  public profileRoute = `/${defaultPath}/${commonRoutes.settings}`;

  @Input() public moduleName!: string;
  @Input() public applicationName!: string;

  private _routesMap$ = createStateful<RoutesMap[]>([]);

  state$ = combineLatest([this._routesMap$.asObservable()]).pipe(
    map(([routeMaps_]) => {
      // Construct the route mapping here
      const routeMaps = routeMaps_;
      const routesIndexes = routeMaps.map((route) => route.key);
      const routeLinks = new Collection<RouteLink>();
      routeMapToLink(routeMaps, this.routeDescriptions).forEach(
        (item: RouteLinkCollectionItemInterface) =>
          routeLinks.add(item.key, item.value)
      );
      return { routeMaps, routeLinks, routesIndexes };
    }),
    map((state) => ({
      routeMaps: state?.routeMaps,
      routeLinks: state?.routeLinks,
      routesIndexes: state?.routesIndexes,
    }))
  );

  constructor(
    public uiState: AppUIStateProvider,
    public readonly typeHelper: TypeUtilHelper
  ) {}

  isFirstRoute(routes: RoutesMap[], item: RoutesMap): boolean {
    return routes.indexOf(item) === 0;
  }
}
