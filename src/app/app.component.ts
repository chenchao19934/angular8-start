import { Component, OnInit, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, NavigationStart, NavigationCancel } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import "./app.componente.less";

@Component({
  selector: 'app-root',
  templateUrl: './app.componente.html',
  encapsulation: ViewEncapsulation.Emulated,
})
export class AppComponent implements OnInit {
  allLoading: boolean;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {
    this.routerChange();
  }

  public ngOnInit() {
  }

  public routerChange() {
    // 单独监听NavigationStart事件
    this.router.events.pipe(
      filter((event) => event instanceof NavigationStart),
      map(() => this.activatedRoute),
      map((route: any) => {
        while (route.firstChild) route = route.firstChild;
        return route;
      }),
    ).subscribe((event) => {
      this.allLoading = true;
      console.log(this.allLoading);
    });

    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map((route: any) => {
        while (route.firstChild) route = route.firstChild;
        return route;
      })
    ).subscribe((event) => {
      this.allLoading = false;
      console.log(this.allLoading);
      // 消除脏查机制
      this.cdr.detectChanges();
    });

    this.router.events.pipe(
      filter((event) => event instanceof NavigationCancel),
      map(() => this.activatedRoute),
      map((route: any) => {
        while (route.firstChild) route = route.firstChild;
        return route;
      }),
    ).subscribe((event) => {
      this.allLoading = false;
      console.log(this.allLoading);
      // 消除脏查机制
      this.cdr.detectChanges();
    });
  }
}
