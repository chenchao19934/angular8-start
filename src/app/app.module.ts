import zh from '@angular/common/locales/zh';
import { NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgZorroAntdModule, NZ_I18N, zh_CN, NZ_ICONS } from 'ng-zorro-antd';
import { IconDefinition } from '@ant-design/icons-angular'
import { UserOutline, LockOutline, SettingOutline, AppstoreOutline, CalculatorOutline, LineChartOutline, SmileOutline, BulbOutline, PlusOutline } from '@ant-design/icons-angular/icons'

import { BreadCrumbComponent, HeaderComponent, SidebarComponent } from '../components/shared';

import { AppComponent } from './app.component';
import { HomeComponent } from './home';
import { LoginComponent } from './login/login.component';

import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routing';
import { HttpClientInterceptor } from '@utils/httpInterceptor';
import { AuthGuard } from '@utils/auth/auth-guard.service';
import { AuthService } from '../utils/auth/auth.service';
import { HelperService } from '../utils/httpInterceptor/helper.service';
import { Params } from '../utils/params.service';
import { PreloadingStrategyService } from './preloading-strategy.service';

registerLocaleData(zh);

const icons: IconDefinition[] = [
  UserOutline,
  LockOutline,
  SettingOutline,
  AppstoreOutline,
  CalculatorOutline,
  LineChartOutline,
  SmileOutline,
  BulbOutline,
  PlusOutline
]
const APP_PROVIDERS: Array<any> = [
  HelperService,
  AuthGuard,
  AuthService,
  PreloadingStrategyService
]
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    HeaderComponent,
    SidebarComponent,
    BreadCrumbComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, {
      useHash: false,
      preloadingStrategy: PreloadingStrategyService
    }),
    NgZorroAntdModule.forRoot(),
  ],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN },
    { provide: NZ_ICONS, useValue: icons },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpClientInterceptor,
      multi: true,
    },
    Params,
    APP_PROVIDERS
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() { }
}
