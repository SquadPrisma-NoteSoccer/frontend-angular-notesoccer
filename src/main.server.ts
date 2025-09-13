import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config.server';
import { provideServerRendering } from '@angular/platform-server';

export default function bootstrap(context: any) {
  // Garante a plataforma de SSR mesmo se o appConfig do server não for mesclado
  const serverConfig = {
    ...(appConfig as any),
    providers: [
      ...(((appConfig as any).providers) ?? []),
      provideServerRendering(),
    ],
  };

  // Alguns setups exigem repassar o `context` ao bootstrap do servidor
  return bootstrapApplication(AppComponent, serverConfig as any, { context } as any);
}
