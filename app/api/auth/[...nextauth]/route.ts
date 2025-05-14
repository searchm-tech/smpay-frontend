import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUser } from "@/services/auth";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        try {
          console.log("2. credentials", credentials);
          const resData = await getUser({
            email: credentials?.email,
            password: credentials?.password,
          });
          console.log("4. resData", resData);
          return resData;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        console.log("token", token);
        console.log("user", user);
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        // token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        console.log("session", session);
        console.log("token", token);
        session.user = {
          //   id: token.id,
          //   email: token.email,
          //   name: token.name,
          //   role: token.role,
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
