import { Component, OnInit, Input } from '@angular/core';
import { RouteLink, RoutesMap, builLinkFromRoutesMap, IRouteLinkCollectionItem } from 'src/app/lib/core/routes';
import { AbstractAlertableComponent } from 'src/app/lib/core/helpers/component-interfaces';
import { AppUIStoreManager } from 'src/app/lib/core/helpers/app-ui-store-manager.service';
import { AuthService } from 'src/app/lib/core/auth/core';
import { Collection } from 'src/app/lib/core/collections';
import { TypeUtilHelper } from '../../../core/helpers/type-utils-helper';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent extends AbstractAlertableComponent implements OnInit {
  public navigationRoutes: Collection<RouteLink>;
  public routesIndexes: string[];
  @Input() routesMap: RoutesMap[];
  @Input() routeDescriptions: { [index: string]: string };

  constructor(
    public appUIStoreManager: AppUIStoreManager,
    public auth: AuthService,
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
