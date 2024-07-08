import { getServerSession } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { getLogoUrl } from './utils';

import { env } from '@/config';
import { login } from '@/features/auth';

export const authOptions = {
  secret: env.NEXTAUTH_SECRET,
  session: {
    maxAge: 36000,
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      const now = Date.now();
      if (user) {
        // Initial login, setting up token details and last activity time
        token.accessToken = user.accessToken;
        token.email = user.email;
        token.id = user.id;
        token.lastActivity = now; // Store the current timestamp
        token.logo = user.logo;
        token.name = user.name;
        token.verify = user.verify;
      } else if (trigger === 'update' && session.updatedUser) {
        // Profile update, modifying token details and updating last activity time
        const updatedUser = session.updatedUser;
        const logo = getLogoUrl(updatedUser.logo);

        token.email = updatedUser.email;
        token.id = updatedUser.id;
        token.lastActivity = now; // Update the current timestamp
        token.logo = logo;
        token.name = updatedUser.user_name;
        token.verify = updatedUser.verify;
      }

      return token;
    },
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.logo = token.logo;
        session.user.verify = token.verify;
        session.accessToken = token.accessToken;
      }
      console.log({ session });
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  providers: [
    Credentials({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const user = await login(credentials);
          return user;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
};

export const getServerAuthSession = () => getServerSession(authOptions);
