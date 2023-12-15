import { Component, Inject, Input, OnInit, inject } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { filter, map } from "rxjs/operators";
import { commonRoutes, defaultPath } from "../partials-configs";
import { Authorizable } from "src/app/lib/core/auth/contracts";
import { AUTH_SERVICE } from "../../login/constants";
import {
  RouteLink,
  RouteLinkCollectionItemInterface,
  RoutesMap,
  routeMapToLink,
} from "../routes";
import { AuthServiceInterface } from "../../login/contracts";
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
export class SidebarComponent implements OnInit {
  @Input() routesMap!: RoutesMap[];
  @Input() routeDescriptions!: { [index: string]: string };

  public dashboardRoute = `/${defaultPath}`;
  public profileRoute = `/${defaultPath}/${commonRoutes.settings}`;

  @Input() public moduleName!: string;
  @Input() public applicationName!: string;

  private _routesMap$ = new BehaviorSubject<RoutesMap[]>([]);
  private userAuthorizations!: string[];

  state$ = this._routesMap$.asObservable().pipe(
    filter((_routes) => _routes.length !== 0 && !!this.routeDescriptions),
    map((routeMaps_) => {
      const links = new Map<string, RouteLink>();
      routeMapToLink(routeMaps_, this.routeDescriptions).forEach(
        (item: RouteLinkCollectionItemInterface) => {
          if (!links.has(item.key)) {
            links.set(item.key, item.value);
          }
        }
      );
      return links;
    })
  );

  constructor(@Inject(AUTH_SERVICE) private auth: AuthServiceInterface) {
    this.auth.signInState$.subscribe((state) => {
      this.userAuthorizations = state.scopes;
    });
  }

  ngOnInit(): void {
    if (this.routesMap) {
      this._routesMap$.next(this.routesMap);
    }
  }

  hasAuthorizations(authorizations: string[]) {
    let alltrues: number = 0;
    authorizations.forEach((item: string) => {
      if (this.userAuthorizations.includes(item)) ++alltrues;
    });
    return alltrues == 0 ? false : true;
  }

  isFirstRoute(routes: RoutesMap[], item: RoutesMap): boolean {
    return routes.indexOf(item) === 0;
  }

  iteratorToArray(values: Iterable<string>) {
    return Array.from(values);
  }
}
