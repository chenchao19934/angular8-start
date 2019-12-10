/**
 * @file 路由拦截守卫
 */
import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot, RouterStateSnapshot,
  CanActivateChild
} from '@angular/router';

@Injectable()
export class AppRouterGurad implements CanActivate, CanActivateChild {
  constructor(
    private router: Router,
  ) { }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    let url: string = state.url;
    return this.urlCheck(url, route, state);
  }

  public canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    let url: string = state.url;
    return this.urlCheck(url, childRoute, state);
  }

  public async urlCheck(url: string, route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    switch (route.routeConfig.path) {
      case '':
        return false;
      case '':
        return false;
      default:
        return true;
    }
  }
}