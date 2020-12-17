import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { defineCustomElements } from '@ionic/pwa-elements/loader';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

  // Call the element loader after the platform has been bootstrapped;
defineCustomElements(window);

const serviceWorker = './app/service/worker/worker.service.ts'
if (navigator.serviceWorker) {
  // console.log('serviceWorker OK');
  navigator.serviceWorker.register(serviceWorker)
    .then()
    .catch(err => console.log(err));
}