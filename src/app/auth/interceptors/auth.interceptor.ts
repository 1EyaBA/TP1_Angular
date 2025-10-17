import { Injectable, inject } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private authService = inject(AuthService);

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // Vérifier si l'utilisateur est authentifié
    if (this.authService.isAuthenticated()) {
      // Récupérer le token depuis le signal
      const token = this.authService.token();

      if (token) {
        // Cloner la requête et ajouter le header Authorization
        const cloneReq = request.clone({
          setHeaders: {
            'Authorization': token
          }
        });
        return next.handle(cloneReq);
      }
    }

    return next.handle(request);
  }
}

export const AuthInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
};
