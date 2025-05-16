import NextAuth from "next-auth";
import type { TSMPayUser, UserType } from "./user";

declare module "next-auth" {
  interface Session {
    user: TSMPayUser;
    accessToken: string;
    refreshToken: string;
  }

  // 평평하게!
  interface User extends TSMPayUser {
    accessToken: string;
    refreshToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends TSMPayUser {
    accessToken: string;
    refreshToken: string;
  }
}
