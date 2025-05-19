import {
  APP_INITIALIZER,
  ApplicationConfig,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  AmplifyConfigService,
  initAmplifyFactory,
} from './core/services/amplify-config/amplify-config.service';
import { authTokenInterceptor } from '@core/interceptors/auth-token.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimationsAsync(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authTokenInterceptor])),
    {
      provide: APP_INITIALIZER,
      useFactory: initAmplifyFactory,
      deps: [AmplifyConfigService],
      multi: true,
    },
  ],
};
