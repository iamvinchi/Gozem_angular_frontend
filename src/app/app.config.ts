import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpinterceptorService } from './httpinterceptor/httpinterceptor.service';
export const appConfig: ApplicationConfig = {
    providers: [provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    {
        provide: HTTP_INTERCEPTORS,
        useClass: HttpinterceptorService,
        multi: true
    },

    importProvidersFrom([BrowserAnimationsModule]),

    ],
};