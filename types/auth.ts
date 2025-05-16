import type { TSMPayUser } from "./user";

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  user: TSMPayUser;
  accessToken: string;
  refreshToken: string;
};

export type ApiResponse<T> = {
  result: T;
  message: string;
  status: number;
};
