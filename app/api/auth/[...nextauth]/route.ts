import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { TSMPayUser } from "@/types/user";

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

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const c = credentials as any;
        if (!c?.email) return null;
        return {
          id: c.id,
          userId: c.userId,
          agentId: c.agentId,
          loginId: c.loginId,
          password: c.password,
          status: c.status,
          isDeleted: c.isDeleted,
          type: c.type,
          name: c.name,
          phoneNumber: c.phoneNumber,
          regDate: c.regDate,
          updateDate: c.updateDate,
          accessToken: c.accessToken,
          refreshToken: c.refreshToken,
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.userId = user.userId;
        token.agentId = user.agentId;
        token.loginId = user.loginId;
        token.password = user.password;
        token.status = user.status;
        token.isDeleted = user.isDeleted;
        token.type = user.type;
        token.name = user.name;
        token.phoneNumber = user.phoneNumber;
        token.regDate = user.regDate;
        token.updateDate = user.updateDate;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        userId: token.userId,
        agentId: token.agentId,
        loginId: token.loginId,
        password: token.password,
        status: token.status,
        isDeleted: token.isDeleted,
        type: token.type,
        name: token.name || "",
        phoneNumber: token.phoneNumber,
        regDate: token.regDate,
        updateDate: token.updateDate,
      };
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      return session;
    },
  },

  pages: {
    signIn: "/sign-in",
  },
});

export { handler as GET, handler as POST };
