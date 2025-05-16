import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { testLogin } from "@/services/auth";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        console.log("authorize", credentials);

        try {
          const resData = await testLogin({
            email: credentials.email,
            password: credentials.password,
          });

          if (resData?.user) {
            return {
              id: resData.user.id,
              email: resData.user.email,
              name: resData.user.name,
              accessToken: resData.accessToken,
              refreshToken: resData.refreshToken,
            };
          }
          return null;
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      console.log("jwt", token, user);
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      console.log("session", session, token);
      if (token) {
        session.user = {
          id: token.id,
          email: token.email,
          name: token.name,
          accessToken: token.accessToken,
        };
      }
      return session;
    },
  },
  pages: {
    // signIn: "/auth/signin",
    signIn: "/sign-in",
  },
});

export { handler as GET, handler as POST };
