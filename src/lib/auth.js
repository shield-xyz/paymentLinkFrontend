import { getServerSession } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { env } from '@/config';
import { authenticate } from '@/features/auth';

function jwtDecode(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(''),
  );

  return JSON.parse(jsonPayload);
}

export const authOptions = {
  secret: env.NEXTAUTH_SECRET,
  session: {
    maxAge: 60 * 60, // 1 hour (if the user is inactive for 1 hour, the session will expire)
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account && account.type === 'credentials') {
        token.userId = account.providerAccountId;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      const accessToken = token?.accessToken;

      if (accessToken && typeof accessToken === 'string') {
        const decoded = jwtDecode(accessToken);
        const expiresAt = decoded.exp * 1000;

        if (Date.now() > expiresAt) {
          console.log('Session expired');
          session.isExpired = true;
        }
        session.user.exp = decoded.exp;
      }

      session.user.id = token.userId;
      session.user.accessToken = token.accessToken;
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        return await authenticate(credentials);
      },
    }),
  ],
};

export const getServerAuthSession = () => getServerSession(authOptions);
