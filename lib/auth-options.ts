import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user }) {
      
      if (!user.email) {
        return false;
      }
// データベースにログイン情報なければサインイン（新規登録）、あればサインアップ
      const dbUser = await prisma.user.upsert({
        where: { email: user.email },
        create: {
          email: user.email,
          name: user.name ?? null,
          image: user.image ?? null,
        },
        update: {
          name: user.name ?? null,
          image: user.image ?? null,
        },
      });

      const favorite = await prisma.favorite.findFirst({
        where: { userId: dbUser.id },
      });

      if (!favorite) {
        await prisma.favorite.create({
          data: {
            name: "お気に入り一覧",
            userId: dbUser.id,
          },
        });
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user?.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email },
        });
        if (dbUser) {
          token.userId = dbUser.id;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.userId) {
        session.user.id = token.userId as number;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // ログインが成功したら、常にトップページ（http://localhost:3000/）にリダイレクトする設定
      return baseUrl;

      // もし特定のページ（例: /dashboard）にしたい場合は以下のように書きます
      // return `${baseUrl}/dashboard`;
    },
  },

  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
