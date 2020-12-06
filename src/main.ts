import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

const promise: Promise<any> = new Promise((resolve, reject) => {
  resolve(1);
});

promise
  .then()
  .then()
  .then()
  .then()
  .then()
  .then()
  .then()
  .then()
  .then()
  .then()
  .then()
  .then()
  .then()
  .then();

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
