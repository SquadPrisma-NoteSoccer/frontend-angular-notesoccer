import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config.server';
import { BootstrapContext } from '@angular/platform-server';

export default function bootstrap(context: BootstrapContext) {
  // Passa o "context" para o bootstrap no servidor
  return bootstrapApplication(AppComponent, appConfig, { context });
}
