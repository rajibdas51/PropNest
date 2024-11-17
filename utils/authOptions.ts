import connectDB from '@/config/database';
import User from '@/models/User';
import GoogleProvider from 'next-auth/providers/google';
import { AuthOptions } from 'next-auth';

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
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
    async signIn({ user, profile }) {
      if (!profile) {
        return false; // Deny sign-in if profile is missing
      }

      // 1. Connect to database
      await connectDB();

      // 2. Check if user exists
      const userExists = await User.findOne({ email: user.email });

      // 3. If not, then add user to database
      if (!userExists) {
        if (!profile?.name || !profile?.email) {
          throw new Error('Profile is missing required fields!');
        }
        const username = (profile.name as string).slice(0, 20);

        await User.create({
          email: profile.email,
          username,
          image: profile.picture || '',
        });
      }

      // 4. Return true to allow sign-in
      return true;
    },
    async session({ session, user }) {
      // 1. Get user from database
      const dbUser = await User.findOne({ email: session.user.email });

      if (dbUser) {
        // 2. Assign the user ID to the session
        session.user.id = dbUser._id.toString();
      }

      // 3. Return modified session
      return session;
    },
  },
};
