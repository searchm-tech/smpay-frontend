import type { TAgencyStatus } from "./agency";
import type { TSMPayUser } from "./user";

export type SignInRequest = {
  id: string;
  password: string;
};

export type SignInResponse = {
  agent: SignInAgent;
  userWithToken: {
    user: TSMPayUser;
    accessToken: Token;
    refreshToken: Token;
  };
};

export type Token = {
  token: string;
  expiredDt: string;
};

export type RefreshTokenResponse = {
  accessToken: Token;
  refreshToken: Token;
  user: TSMPayUser;
};

export type SignInAgent = {
  id: number;
  name: string;
  uniqueCode: string;
  representativeName: string;
  businessRegistrationNumber: string;
  status: TAgencyStatus;
  registerDt: string;
};
