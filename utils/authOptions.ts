import GoogleProvider from 'next-auth/providers/google';
import { NextAuthOptions } from 'next-auth';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
  callbacks: {
    // Invoked on successfull sign in
    async signIn({ account, profile }) {
      //1. Connect to the database
      //2. Check if user exists
      //3.if not, create user
      //4. Return true to allow sign in
    },
    async session({ session }) {
      //1.get user from database
      //2.Assign user id from the session
      //3.Rturn session
    },
  },
};
