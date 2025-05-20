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
  secret: process.env.NEXTAUTH_SECRET,
  debug: true, // ✅ 추가
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        id: { label: "Login ID", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const c = credentials as any;
        if (!c?.id) return null;
        return {
          id: c.id,
          userId: c.userId,
          agentId: c.agentId,
          loginId: c.loginId,
          status: c.status,
          type: c.type,
          name: c.name,
          phoneNumber: c.phoneNumber,
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
        token.id = Number(user.id);
        token.userId = user.userId;
        token.agentId = user.agentId;
        token.status = user.status;
        token.type = user.type;
        token.name = user.name;
        token.phoneNumber = user.phoneNumber;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id,
        agentId: token.agentId,
        userId: token.userId,
        status: token.status,
        type: token.type,
        name: token.name || "",
        phoneNumber: token.phoneNumber,
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
