export interface User {
  id: number;
  name: string;
  email: string;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    access_token: string;
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface ApiError {
  success: boolean;
  message: string;
  data?: unknown;
  code?: number;
  errors?: Record<string, string[]>;
}
