import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/prisma/prisma";
import * as argon2 from "argon2";

export const AuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email:", type: "text", placeholder: "your email" },
        password: {
          label: "Password:",
          type: "password",
          placeholder: "your password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        const user = await prisma.user.findFirst({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error("No user found");
        }

        const isPasswordValid = await argon2.verify(
          user.password,
          credentials.password
        );

        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }

        return user;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        if ('role' in user) {
          token.role = (user as User).role;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        const user = session.user as User;
        user.id = token.id as string;
        user.email = token.email as string;
        user.role = token.role as User['role'];
      }
      return session;
    },
  },
};

export interface User {
  id: string;
  email: string;
  password: string;
  role: "admin" | "author" | "reviewer" | "viewer";
  isAdmin?: boolean;
}
