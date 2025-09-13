import { ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig as browserConfig } from './app.config';

export const appConfig: ApplicationConfig = {
  ...browserConfig,
  providers: [
    ...(browserConfig.providers ?? []),
    provideServerRendering(), // habilita SSR no lado do servidor
  ],
};
