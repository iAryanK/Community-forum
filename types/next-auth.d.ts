import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      isAdmin: boolean;
      id: string;
    } & DefaultSession["user"];
  }
}
