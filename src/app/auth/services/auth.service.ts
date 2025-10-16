import { Injectable, inject, signal, computed, effect } from '@angular/core';
import { CredentialsDto } from '../dto/credentials.dto';
import { LoginResponseDto } from '../dto/login-response.dto';
import { HttpClient } from '@angular/common/http';
import { API } from '../../../config/api.config';
import { Observable, tap } from 'rxjs';
import { StoredAuthData } from '../interfaces/auth.interface';
const AUTH_STORAGE_KEY = 'auth_data';
const TOKEN_STORAGE_KEY = 'token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  private userIdSignal = signal<string | null>(null);
  private userEmailSignal = signal<string | null>(null);
  private tokenSignal = signal<string | null>(null);

  readonly userId = this.userIdSignal.asReadonly();
  readonly userEmail = this.userEmailSignal.asReadonly();
  readonly token = this.tokenSignal.asReadonly();

  // Computed signal pour savoir si l'utilisateur est authentifié
  // Vérifie à la fois les signals ET le localStorage
  readonly isAuthenticated = computed(() => {
    const hasSignals =
      this.userIdSignal() !== null &&
      this.userEmailSignal() !== null &&
      this.tokenSignal() !== null;

    // Double vérification avec localStorage pour plus de sécurité
    const hasStorage =
      localStorage.getItem(AUTH_STORAGE_KEY) !== null &&
      localStorage.getItem(TOKEN_STORAGE_KEY) !== null;

    return hasSignals && hasStorage;
  });

  constructor() {
    // Recharger l'état au démarrage de l'application
    this.loadAuthState();

    // Effect pour synchroniser automatiquement avec localStorage
    effect(() => {
      const id = this.userIdSignal();
      const email = this.userEmailSignal();
      const token = this.tokenSignal();

      if (id && email && token) {
        // Sauvegarder dans les deux formats pour compatibilité
        this.saveToStorage({ id, email, token });
      } else {
        this.clearStorage();
      }
    });
  }

  login(credentials: CredentialsDto): Observable<LoginResponseDto> {
    return this.http.post<LoginResponseDto>(API.login, credentials).pipe(
      tap((response) => {
        // Le backend retourne response.id comme token
        // On sauvegarde l'id, l'email et le token
        this.setAuthState(response.id, credentials.email, response.id);
      })
    );
  }

  logout(): void {
    this.clearAuthState();
  }

  private setAuthState(id: string, email: string, token: string): void {
    this.userIdSignal.set(id);
    this.userEmailSignal.set(email);
    this.tokenSignal.set(token);
  }

  private clearAuthState(): void {
    this.userIdSignal.set(null);
    this.userEmailSignal.set(null);
    this.tokenSignal.set(null);
  }

  private loadAuthState(): void {
    try {
      const storedData = localStorage.getItem(AUTH_STORAGE_KEY);
      if (storedData) {
        const authData: StoredAuthData = JSON.parse(storedData);

        // Vérifier que toutes les propriétés existent
        if (authData.id && authData.email && authData.token) {
          this.setAuthState(authData.id, authData.email, authData.token);
          return;
        }
      }

      const oldToken = localStorage.getItem(TOKEN_STORAGE_KEY);
      if (oldToken) {
        this.setAuthState(oldToken, 'user@gmail.com', oldToken);
      }
    } catch (error) {
      console.error('Erreur lors du chargement de l\'état d\'authentification', error);
      this.clearStorage();
    }
  }

  private saveToStorage(data: StoredAuthData): void {
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(data));

      localStorage.setItem(TOKEN_STORAGE_KEY, data.token);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde dans localStorage', error);
    }
  }

  private clearStorage(): void {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    localStorage.removeItem(TOKEN_STORAGE_KEY);
  }

  getToken(): string | null {
    return this.tokenSignal();
  }
}
