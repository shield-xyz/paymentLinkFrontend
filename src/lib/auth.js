import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';

import { getLogoUrl } from './utils';

import { env } from '@/config';
import { login } from '@/features/auth';

const SignInSchema = z.object({
  validationToken: z.string().startsWith('vtok_').length(39),
});

const ValidationResponseSchema = z.object({
  user_auth: z.object({
    fp_id: z.string(),
    auth_events: z.array(
      z.object({
        kind: z.string(),
        timestamp: z.string(),
      }),
    ),
  }),
});

export const {
  handlers,
  signIn,
  signOut,
  auth: getServerAuthSession,
} = NextAuth({
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
        token.admin = user.admin;
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
        token.admin = updatedUser.admin;
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
        session.user.admin = token.admin;
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
          const user = await login(credentials);
          return user;
        } catch (error) {
          return null;
        }
      },
    }),
    Credentials({
      id: 'footprint',
      name: 'Footprint',
      credentials: {
        validationToken: { type: 'text' },
      },
      authorize: async (credentials) => {
        try {
          console.log({ credentials });
          const { validationToken } =
            await SignInSchema.parseAsync(credentials);

          console.log('authorize', { validationToken });
          console.log('FOOTPRINT_API_KEY', process.env.FOOTPRINT_API_KEY);

          const res = await fetch(
            'https://api.onefootprint.com/onboarding/session/validate',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'X-Footprint-Secret-Key': process.env.FOOTPRINT_API_KEY || '',
              },
              body: JSON.stringify({ validation_token: validationToken }),
            },
          );

          const json = await res.json();

          console.log({ json });
          await ValidationResponseSchema.parseAsync(json);

          return { validationToken };
        } catch (error) {
          return null;
        }
      },
    }),
  ],
});
