import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config.server';

export default function bootstrap(context: any) {
  // Alguns setups de SSR exigem receber e repassar o `context` no server.
  // Como os types podem não expor BootstrapContext, usamos `as any`.
  return bootstrapApplication(AppComponent, appConfig, { context } as any);
}
