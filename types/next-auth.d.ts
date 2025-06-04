import NextAuth from "next-auth";
import type { TSMPayUser, UserType } from "./user";

export type UserWithUniqueCode = TSMPayUser & { uniqueCode: string };

declare module "next-auth" {
  interface Session {
    user: UserWithUniqueCode;
    accessToken: string;
    refreshToken: string;
  }

  // 평평하게!
  interface User extends UserWithUniqueCode {
    accessToken: string;
    refreshToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends UserWithUniqueCode {
    accessToken: string;
    refreshToken: string;
  }
}
