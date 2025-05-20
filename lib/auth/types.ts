export interface User {
  id: number;
  name: string;
  email: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
}

export interface ApiError {
  success: boolean;
  message: string;
  data?: unknown;
  code?: number;
  errors?: Record<string, string[]>;
}

