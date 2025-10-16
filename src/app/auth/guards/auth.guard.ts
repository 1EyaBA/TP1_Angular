import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { APP_ROUTES } from '../../../config/routes.config';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private authService = inject(AuthService);
  private router = inject(Router);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // Le computed signal isAuthenticated vérifie :
    // - Les signals (id, email, token)
    // - ET le localStorage (auth_data et token)
    if (!this.authService.isAuthenticated()) {
      console.warn('Accès refusé - Utilisateur non authentifié');
      this.router.navigate([APP_ROUTES.login]);
      return false;
    }

    console.log(' Accès autorisé - Utilisateur authentifié');
    return true;
  }
}
