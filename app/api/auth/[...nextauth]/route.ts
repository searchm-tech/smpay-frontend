import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

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
          uniqueCode: c.uniqueCode,
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
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
        token.uniqueCode = user.uniqueCode;
      }

      // trigger 옵션이 'update'인 경우 (updateSession 호출 시)
      if (trigger === "update" && session?.user) {
        const { name, phoneNumber } = session.user;
        // token의 정보를 업데이트
        if (name) token.name = name;
        if (phoneNumber) token.phoneNumber = phoneNumber;
      }

      return token;
    },
    async session({ session, token }) {
      session.user = {
        loginId: token.id.toString(),
        id: token.id,
        agentId: token.agentId,
        userId: token.userId,
        status: token.status,
        type: token.type,
        name: token.name || "",
        phoneNumber: token.phoneNumber,
        uniqueCode: token.uniqueCode,
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
