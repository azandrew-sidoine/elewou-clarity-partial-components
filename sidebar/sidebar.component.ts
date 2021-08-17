import { Component, OnInit, Input, HostBinding } from "@angular/core";
import {
  RouteLink,
  RoutesMap,
  routeMapToLink,
  RouteLinkCollectionItemInterface,
} from "src/app/lib/core/routes";
import { AuthPathConfig, AuthService } from "src/app/lib/core/auth/core";
import { Collection } from "src/app/lib/core/collections";
import { TypeUtilHelper } from "../../../core/helpers/type-utils-helper";
import {
  Authorizable,
  IAppUser,
  userCanAny,
} from "src/app/lib/core/auth/contracts/v2";
import { map } from "rxjs/operators";
import { TranslationService } from "src/app/lib/core/translator";
import { Dialog } from "src/app/lib/core/utils";
import { Router } from "@angular/router";
import { defaultPath, commonRoutes } from "../partials-configs";
import { AppUIStateProvider } from "src/app/lib/core/ui-state";
import { createStateful } from "src/app/lib/core/rxjs/helpers";
import { combineLatest } from "rxjs";

const hasAuthorizations = (user: Authorizable, authorizations: string[]) => {
  if (authorizations?.length === 0) {
    return true;
  }
  if (user) {
    return userCanAny(user, authorizations);
  }
  return false;
};

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styles: [
    `
    :host ::ng-deep .clr-vertical-nav {
      min-height: 100%;
      height: 100%;
    }
    `
  ],
})
export class SidebarComponent implements OnInit {

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

  state$ = combineLatest([
    this.auth.state$,
    this._routesMap$.asObservable(),
  ]).pipe(
    map(([state, routeMaps_]) => {
      // Construct the route mapping here
      const user = state.user as IAppUser & Authorizable;
      const routeMaps = routeMaps_
        .filter(
          (route) => hasAuthorizations(user, route?.authorizations || [])
        )
        .map((route: RoutesMap) => {
          if (route?.children) {
            const children = route?.children?.filter((child) =>
              hasAuthorizations(user, child?.authorizations || [])
            );
            route = { ...route, children };
          }
          return route;
        })
        .filter((value) => (value ? true : false));
      const routesIndexes = routeMaps.map((route) => route.key);
      const routeLinks = new Collection<RouteLink>();
      routeMapToLink(routeMaps, this.routeDescriptions).forEach(
        (item: RouteLinkCollectionItemInterface) =>
          routeLinks.add(item.key, item.value)
      );
      return { ...user, routeMaps, routeLinks, routesIndexes };
    }),
    map((state) => ({
      username: state?.userDetails
        ? state?.userDetails.firstname && state?.userDetails.lastname
          ? `${state?.userDetails.firstname}, ${state?.userDetails.lastname}`
          : state?.userDetails.email
          ? state?.userDetails.email
          : state?.username
        : state?.username,
      routeMaps: state?.routeMaps,
      routeLinks: state?.routeLinks,
      routesIndexes: state?.routesIndexes,
    }))
  );

  constructor(
    public uiState: AppUIStateProvider,
    public auth: AuthService,
    public readonly typeHelper: TypeUtilHelper,
    private translator: TranslationService,
    private dialog: Dialog,
    private router: Router
  ) {}

  ngOnInit(): void {}

  isFirstRoute(routes: RoutesMap[], item: RoutesMap): boolean {
    return routes.indexOf(item) === 0;
  }


  hasAuthorizations(user: Authorizable, authorizations: string[]): boolean {
    if (authorizations?.length === 0) {
      return true;
    }
    if (user) {
      return userCanAny(user, authorizations);
    }
    return false;
  }

  public redirectToLogin(): void {
    this.router.navigate([AuthPathConfig.LOGIN_PATH], {
      replaceUrl: true,
    });
    this.uiState.endAction();
  }

  async actionLogout(event: Event): Promise<void> {
    event.preventDefault();
    const translation = await this.translator
      .translate("promptLogout")
      .toPromise();
    if (this.dialog.confirm(translation)) {
      this.uiState.startAction();
      await this.auth.logout().toPromise();
    }
  }
}
