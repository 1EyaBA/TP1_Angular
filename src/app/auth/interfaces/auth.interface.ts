export interface AuthState {
  id: string | null;
  email: string | null;
  token: string | null;
  isAuthenticated: boolean;
}

export interface StoredAuthData {
  id: string;
  email: string;
  token: string;
}
