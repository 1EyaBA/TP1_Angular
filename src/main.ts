import { AuthInterceptorProvider } from './app/auth/interceptors/auth.interceptor';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ServiceWorkerModule } from '@angular/service-worker';
import { isDevMode, importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { routes } from './app/routes';
import { provideRouter } from '@angular/router';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      FormsModule,
      ToastrModule.forRoot(), // ToastrModule added
      ReactiveFormsModule,
      ServiceWorkerModule.register("ngsw-worker.js", {
        enabled: !isDevMode(),
        // Register the ServiceWorker as soon as the application is stable
        // or after 30 seconds (whichever comes first).
        registrationStrategy: "registerWhenStable:30000",
      })
    ),
    provideRouter(routes),
    AuthInterceptorProvider,
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
  ]
})
  .catch(err => console.error(err));
