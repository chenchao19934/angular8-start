import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import registerServiceWorker from './registerServiceWorker';

import './assets/less/index.less';
import 'quill/dist/quill.snow.css'
import 'ng-zorro-antd/src/ng-zorro-antd.less';

if (process.env.NODE_ENV === 'production') {
  enableProdMode();
}
platformBrowserDynamic().bootstrapModule(AppModule).catch((e) => console.error(e));
registerServiceWorker()