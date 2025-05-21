export type ApiSuccessResponse<T> = {
  success: true;
  message: string;
  data: T;
};

export interface ApiError {
  success: boolean;
  message: string;
  data?: unknown;
  code?: number;
  errors?: Record<string, string[]>;
}