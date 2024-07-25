// src/pages/api/auth/[...nextauth].js or [...nextauth].ts
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const options = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      try {
        // console.log("Session callback triggered");
        // console.log("Session user email:", session.user.email);

        const sessionUser = await prisma.user.findFirst({
          where: { email: session.user.email },
        });

        if (sessionUser) {
          session.user.id = sessionUser.id.toString();
          // console.log("Session user ID set:", session.user.id);
        } else {
          console.log("No user found with the given email.");
        }
      } catch (error) {
        console.error("Error in session callback:", error);
      }

      // console.log("Returning session:", session);
      return session;
    },
    async signIn({ profile }) {
      try {
        const userExists = await prisma.user.findFirst({
          where: { email: profile.email },
        });

        if (!userExists) {
          await prisma.user.create({
            data: {
              email: profile.email,
              username: profile.name.replace(/\s+/g, "").toLowerCase(),
              imgurl: profile.picture,
            },
          });
        }

        return true;
      } catch (error) {
        console.error("SIGN-IN ERROR", error);
        return false;
      }
    },
  },
};

export default NextAuth(options);
