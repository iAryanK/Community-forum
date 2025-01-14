import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { connectToDB } from "./lib/db";
import User from "./models/user.model";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],

  callbacks: {
    async signIn({ user }) {
      const { email, name, image } = user;
      await connectToDB();
      const alreadyUser = await User.findOne({ email });

      if (alreadyUser) return true;

      await User.create({
        name: name,
        email: email,
        image: image,
      });

      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        const db_user = await User.findOne({ email: user.email });
        token.isAdmin = db_user.isAdmin;
        token.id = db_user._id;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.isAdmin = token.isAdmin;

      return session;
    },
  },
});
