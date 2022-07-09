import { Component, OnInit, Input } from '@angular/core';
import {
  RouteLink,
  RoutesMap,
  builLinkFromRoutesMap,
  IRouteLinkCollectionItem,
} from 'src/app/lib/core/routes';
import { AbstractAlertableComponent } from 'src/app/lib/core/helpers/component-interfaces';
import { AppUIStoreManager } from 'src/app/lib/core/helpers/app-ui-store-manager.service';
import { AuthPathConfig, AuthService } from 'src/app/lib/core/auth/core';
import { Collection } from 'src/app/lib/core/collections';
import { TypeUtilHelper } from '../../../core/helpers/type-utils-helper';
import {
  Authorizable,
  IAppUser,
  userCanAny,
} from 'src/app/lib/core/auth/contracts/v2';
import { map } from 'rxjs/operators';
import { TranslationService } from 'src/app/lib/core/translator';
import { Dialog } from 'src/app/lib/core/utils';
import { Router } from '@angular/router';
import { adminPath, backendRoutePaths, defaultPath } from '../partials-configs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
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
    'https://scontent.flfw1-1.fna.fbcdn.net/v/t1.0-9/129900309_3678495065550810_1722521212220721187_n.jpg?_nc_cat=102&ccb=3&_nc_sid=730e14&_nc_ohc=Jhfz9EmsyaMAX8BGeyd&_nc_ht=scontent.flfw1-1.fna&oh=1dafd888c9388daa883f12ebd42ceeca&oe=604B2045';

  public dashboardRoute = `/${defaultPath}`;
  public profileRoute = `/${defaultPath}/${adminPath.accountRoute}`;

  @Input() public moduleName: string;
  @Input() public applicationName: string;

  public modulesBackendRoute = backendRoutePaths.modules;

  // state$ = this.auth.state$.pipe(
  //   map(state => state.user)
  // );
  state$ = this.auth.state$.pipe(
    map((state) => state.user as IAppUser),
    map((state) => {
      if (state) {
        return {
          username: state.userDetails
            ? state.userDetails.firstname && state.userDetails.lastname
              ? `${state.userDetails.firstname}, ${state.userDetails.lastname}`
              : state.userDetails.email
              ? state.userDetails.email
              : state.username
            : state.username,
        };
      }
      return ``;
    })
  );

  constructor(
    public appUIStoreManager: AppUIStoreManager,
    public auth: AuthService,
    public readonly typeHelper: TypeUtilHelper,
    private translator: TranslationService,
    private dialog: Dialog,
    private router: Router
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

  hasAuthorizations(user: Authorizable, authorizations: string[]): boolean {
    return userCanAny(user, authorizations);
  }

  public redirectToLogin(): void {
    this.router.navigate([AuthPathConfig.LOGIN_PATH], {
      replaceUrl: true,
    });
    this.appUIStoreManager.completeUIStoreAction();
  }

  async actionLogout(event: Event): Promise<void> {
    event.preventDefault();
    const translation = await this.translator
      .translate('promptLogout')
      .toPromise();
    if (this.dialog.confirm(translation)) {
      this.appUIStoreManager.initializeUIStoreAction();
      await this.auth.logout().toPromise();
    }
  }
}
