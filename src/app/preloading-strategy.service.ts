import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class PreloadingStrategyService implements PreloadingStrategy {
  public preload(route: Route, load: () => Observable<any>): Observable<any> {
    return route.data && route.data.preload ? load() : of(null);
  }
}
