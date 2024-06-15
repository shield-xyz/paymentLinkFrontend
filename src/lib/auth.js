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
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.email = user.email;
        token.picture = user.image;
        token.username = user.username;
      }

      return token;
    },
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.firstName = token.firstName;
        session.user.lastName = token.lastName;
        session.user.email = token.email;
        session.user.image = token.picture;
        session.user.username = token.username;
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
