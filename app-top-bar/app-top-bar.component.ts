import { Component, OnInit, Input } from '@angular/core';
import { RouteLink, RoutesMap, builLinkFromRoutesMap, IRouteLinkCollectionItem } from 'src/app/lib/routes';
import { AuthPathConfig, AuthService } from 'src/app/lib/auth/core';
import { Router } from '@angular/router';
import { TranslationService } from 'src/app/lib/translator';
import { backendRoutePaths, defaultPath, adminPath } from '../partials-configs';
import { Collection } from 'src/app/lib/collections';
import { Dialog, isDefined } from 'src/app/lib/utils';
import { IAppUser } from 'src/app/lib/auth/contracts/v2';
import { map } from 'rxjs/operators';
import { AppUIStateProvider } from '../../../lib/helpers/app-ui-store-manager.service';

@Component({
  selector: 'app-app-top-bar',
  templateUrl: './app-top-bar.component.html',
  styles: [
    `.branding {
      background: #ffffff;
      }
      .title {
        padding: 0 16px;
        &.module_name{
          background: #033258;
          color: #ffbc48;
          box-shadow: 4px 0px 6px -3px #000000bd;
        }
      }
      .header .branding, header .branding {
        padding: 0 0 0 1rem;
      }
      clr-header.header {
        box-shadow: 2px 2px 12px -4px #999;
      }
      .app-logo{
        width: 20%;
      }
    `
  ]
})
export class AppTopBarComponent implements OnInit {

  public elewouLogo = '/assets/images/logo-elewou-main.png';
  public elewouIcon = '/assets/images/icon-elewou.png';

  public navigationRoutes: Collection<RouteLink>;
  public routesIndexes: string[];
  public dashboardRoute = `/${defaultPath}`;
  public profileRoute = `/${defaultPath}/${adminPath.accountRoute}`;

  @Input() public routesMap: RoutesMap[];
  @Input() routeDescriptions: { [index: string]: string };
  @Input() public moduleName: string;
  @Input() public applicationName: string;

  public modulesBackendRoute = backendRoutePaths.modules;

  state$ = this.auth.state$.pipe(
    map(state => state.user as IAppUser),
    map(state => ({
      username: state.userDetails ?
        (state.userDetails.firstname && state.userDetails.lastname ? `${state.userDetails.firstname}, ${state.userDetails.lastname}` :
          (state.userDetails.email ? state.userDetails.email : state.username)) : state.username
    }))
  );

  constructor(
    private auth: AuthService,
    private translator: TranslationService,
    private dialog: Dialog,
    private router: Router,
    private uiState: AppUIStateProvider
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
