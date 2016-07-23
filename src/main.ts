import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import {HTTP_PROVIDERS} from "@angular/http";

import { AppComponent, environment } from './app/';
import {provideForms, disableDeprecatedForms} from "@angular/forms";
import {APP_ROUTES_PROVIDERS} from "./app/app.route";

if (environment.production) {
  enableProdMode();
}

bootstrap(AppComponent, [
  APP_ROUTES_PROVIDERS,
  HTTP_PROVIDERS,
  provideForms(),
  disableDeprecatedForms()
]);

