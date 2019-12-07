import { Routes } from '@angular/router';
import { HomeComponent } from './home';
import { LoginComponent } from './login/login.component';

export const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
      { path: 'article', loadChildren: './article/article.module#ArticleModule' },
      { path: 'articletype', loadChildren: './articletype/articletype.module#ArticleTypeModule' },
      { path: 'tag', loadChildren: './tag/tag.module#TagModule', data: { preload: true } },
      { path: 'user', loadChildren: './user/user.module#UserModule' },
      { path: 'comment', loadChildren: './comment/comment.module#CommentModule' },
      { path: 'charts', loadChildren: './charts/chart.module#ChartModule', data: { preload: true } },
      { path: 'systemlog', loadChildren: './systemlogs/systemlog.module#SystemLogModule', data: { preload: true } },
      { path: 'doubleball', loadChildren: './doubleball/doubleball.module#DoubleBallModule' },
      { path: 'demos', loadChildren: './demos/demos.module#DemosModule' },
      { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
];