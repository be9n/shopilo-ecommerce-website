import { ApiSuccessResponse } from "@/types/global";

export type LoginResponse = ApiSuccessResponse<{
  user: User;
  access_token: string;
}>;

export interface User {
  id: number;
  name: string;
  email: string;
}
export interface AuthState {
  user: User | null;
  isLoading: boolean;
}
