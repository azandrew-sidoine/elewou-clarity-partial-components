import { Component, OnInit, Input } from "@angular/core";
import {
  RouteLink,
  RoutesMap,
  routeMapToLink,
  RouteLinkCollectionItemInterface,
} from "src/app/lib/core/routes";
import { AuthPathConfig, AuthService } from "src/app/lib/core/auth/core";
import { Router } from "@angular/router";
import { TranslationService } from "src/app/lib/core/translator";
import { defaultPath, commonRoutes } from "../partials-configs";
import { Collection } from "src/app/lib/core/collections";
import { Dialog, isDefined } from "src/app/lib/core/utils";
import { IAppUser } from "../../../core/auth/contracts/v2";
import { map } from "rxjs/operators";
import { AppUIStateProvider } from "src/app/lib/core/ui-state";

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

  state$ = this.auth.state$.pipe(
    map((state) => state.user as IAppUser),
    map((state) => ({
      username: state?.userDetails
        ? state?.userDetails?.firstname && state?.userDetails?.lastname
          ? `${state?.userDetails?.firstname}, ${state?.userDetails?.lastname}`
          : state?.userDetails?.email
          ? state.userDetails.email
          : state?.username
        : state?.username,
      isGuess: !isDefined(state),
    }))
  );

  constructor(
    public uiState: AppUIStateProvider,
    private auth: AuthService,
    private translator: TranslationService,
    private dialog: Dialog,
    private router: Router
  ) {
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
