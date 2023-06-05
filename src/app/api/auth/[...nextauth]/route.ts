import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { axiosInstance } from "@/app/services";

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    CredentialsProvider({
      id: "login",
      async authorize(credentials) {
        const res = await axiosInstance.post("/auth/signup", credentials);
        return res.data;
      },
      credentials: {
        email: { label: "email", type: "text ", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.accessToken = user.token;
      }

      return token;
    },
    async session({ session, token }: any) {
      console.log(session, token);
      session.accessToken = token?.accessToken;
      return session as any;
    },
  },
  theme: {
    colorScheme: "auto",
    brandColor: "#9054F7",
    logo: "/logo.png",
    buttonText: "#ed5c7",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(nextAuthOptions);
export { handler as GET, handler as POST };
