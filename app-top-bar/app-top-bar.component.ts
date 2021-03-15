import { Component, OnInit, Input } from '@angular/core';
import { RouteLink, RoutesMap, builLinkFromRoutesMap, IRouteLinkCollectionItem } from 'src/app/lib/domain/routes';
import { AuthPathConfig, AuthService } from 'src/app/lib/domain/auth/core';
import { Router } from '@angular/router';
import { TranslationService } from 'src/app/lib/domain/translator';
import { AbstractAlertableComponent } from 'src/app/lib/domain/helpers/component-interfaces';
import { AppUIStoreManager } from 'src/app/lib/domain/helpers/app-ui-store-manager.service';
import { backendRoutePaths, defaultPath, adminPath } from '../partials-configs';
import { Collection } from 'src/app/lib/domain/collections';
import { Dialog, isDefined } from 'src/app/lib/domain/utils';
import { IAppUser, User } from '../../../domain/auth/contracts/v2';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-app-top-bar',
  templateUrl: './app-top-bar.component.html',
  styles: [
    `
    `
  ]
})
export class AppTopBarComponent extends AbstractAlertableComponent implements OnInit {

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

  constructor(
    public appUIStoreManager: AppUIStoreManager,
    private auth: AuthService,
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
