import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideAnimations(),
    provideRouter(routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled', // Restore scroll position when navigating back
        anchorScrolling: 'enabled',          // Enable anchor links to scroll properly
        // scrollOffset: [0, 0],                // Adjust offset if needed (e.g., for a sticky navbar)
      })
    ), 
    provideClientHydration(),  
    provideHttpClient(withInterceptorsFromDi(), withFetch()),
    ]
};
