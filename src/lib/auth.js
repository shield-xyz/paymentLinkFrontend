import { getServerSession } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { env } from '@/config';
import { login } from '@/features/auth';

// maxAge: 30 * 24 * 60 * 60, // 30 days

export const authOptions = {
  secret: env.NEXTAUTH_SECRET,
  session: {
    maxAge: 60 * 60 * 30, // 30 days
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.accessToken = user.accessToken;
      }

      return token;
    },
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        session.accessToken = token.accessToken;
      }

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
          return await login(credentials);
        } catch (error) {
          return null;
        }
      },
    }),
  ],
};

export const getServerAuthSession = () => getServerSession(authOptions);
