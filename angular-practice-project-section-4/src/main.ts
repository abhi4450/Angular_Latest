import {
  bootstrapApplication,
  platformBrowser,
} from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
// bootstrapApplication(AppComponent).catch((err) => console.error(err));

platformBrowserDynamic().bootstrapModule(AppModule);
