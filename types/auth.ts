import type { TSMPayUser } from "./user";

export type SignInRequest = {
  id: string;
  password: string;
};

export type SignInResponse = {
  accessToken: string;
  refreshToken: string;
  user: TSMPayUser;
};
