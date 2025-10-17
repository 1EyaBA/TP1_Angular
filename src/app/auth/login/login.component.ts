import { Component, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CredentialsDto } from '../dto/credentials.dto';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { APP_ROUTES } from '../../../config/routes.config';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule],
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private toastr = inject(ToastrService);

  login(credentials: CredentialsDto) {
    console.log('Tentative de connexion avec:', credentials.email);

    this.authService.login(credentials).subscribe({
      next: (response) => {
        console.log('Connexion réussie!');
        console.log(' Réponse du serveur:', response);
        console.log(' Token sauvegardé:', response.id);

        // Les signals sont automatiquement mis à jour via tap() dans le service
        this.toastr.success(`Bienvenu ${credentials.email} :)`);
        this.router.navigate([APP_ROUTES.cv]);

        // Debug : vérifier l'état après connexion
        setTimeout(() => {
          console.log('État après connexion:');
          console.log('  - isAuthenticated:', this.authService.isAuthenticated());
          console.log('  - userId:', this.authService.userId());
          console.log('  - userEmail:', this.authService.userEmail());
          console.log('  - token:', this.authService.token());
        }, 100);
      },
      error: (error) => {
        console.error(' Erreur de connexion:', error);
        this.toastr.error('Veuillez vérifier vos credentials');
      },
    });
  }
}
