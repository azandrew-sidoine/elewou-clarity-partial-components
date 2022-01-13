import { Component, OnInit, Input } from '@angular/core';
import { RouteLink, RoutesMap, builLinkFromRoutesMap, IRouteLinkCollectionItem } from 'src/app/lib/core/routes';
import { AuthPathConfig, AuthService } from 'src/app/lib/core/auth/core';
import { Collection } from 'src/app/lib/core/collections';
import { TypeUtilHelper } from '../../../core/helpers/type-utils-helper';
import { Authorizable, IAppUser, userCanAny } from 'src/app/lib/core/auth/contracts/v2';
import { map } from 'rxjs/operators';
import { TranslationService } from 'src/app/lib/core/translator';
import { Dialog } from 'src/app/lib/core/utils';
import { Router } from '@angular/router';
import { defaultPath, commonRoutes } from '../partials-configs';
import { AppUIStateProvider } from 'src/app/lib/core/ui-state';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {
  public navigationRoutes: Collection<RouteLink>;
  public routesIndexes: string[] = [];
  @Input() routesMap: RoutesMap[] = [];
  @Input() routeDescriptions!: { [index: string]: string };
  public elewouIcon = 'https://scontent.flfw1-1.fna.fbcdn.net/v/t1.0-9/129900309_3678495065550810_1722521212220721187_n.jpg?_nc_cat=102&ccb=3&_nc_sid=730e14&_nc_ohc=Jhfz9EmsyaMAX8BGeyd&_nc_ht=scontent.flfw1-1.fna&oh=1dafd888c9388daa883f12ebd42ceeca&oe=604B2045';
  // public elewouIcon = '/assets/images/icon-elewou.png';
  public dashboardRoute = `/${defaultPath}`;
  public profileRoute = `/${defaultPath}/${commonRoutes.accountRoute}`;

  @Input() public moduleName!: string;
  @Input() public applicationName!: string;

  state$ = this.auth.state$.pipe(
    map(state => state.user as IAppUser),
    map(state => ({
        username: state?.userDetails ?
        (state?.userDetails.firstname && state?.userDetails.lastname ? `${state?.userDetails.firstname}, ${state?.userDetails.lastname}` :
          (state?.userDetails.email ? state?.userDetails.email : state?.username)) : state?.username
    }))
  );


  constructor(
    public uiState: AppUIStateProvider,
    public auth: AuthService,
    public readonly typeHelper: TypeUtilHelper,
    private translator: TranslationService,
    private dialog: Dialog,
    private router: Router
  ) {
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
    if (authorizations?.length === 0) {
      return true;
    }
    if(user) {
      return userCanAny(user, authorizations);
    }
    return false;
  }



  public redirectToLogin(): void {
    this.router.navigate([AuthPathConfig.LOGIN_PATH], {
      replaceUrl: true
    });
    this.uiState.endAction();
  }

  async actionLogout(event: Event): Promise<void> {
    event.preventDefault();
    const translation = await this.translator.translate('promptLogout').toPromise();
    if (this.dialog.confirm(translation)) {
      this.uiState.startAction();
      await this.auth.logout().toPromise();
    }
  }

}
