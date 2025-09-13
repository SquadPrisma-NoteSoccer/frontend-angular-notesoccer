// src/main.server.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config.server';

export default function bootstrap() {
  return bootstrapApplication(AppComponent, appConfig);
}

