import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { login, loginWithFootprint } from '@/features/auth';

import { getLogoUrl } from './utils';
import { authConfig } from '../../auth.config';

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
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
          const data = await loginWithFootprint({
            validationToken: credentials.validationToken,
          });

          console.log('authorize', { data });

          // If the data.response is 'user not found', the user is not registered
          // and should be redirected to the registration page
          if (data.response === 'user not found') {
            return {
              isRegistered: false,
              validationToken: credentials.validationToken,
            };
          } else {
            return {
              ...data.response,
              logo: getLogoUrl(data.response.logo) || '',
              isRegistered: true,
              validationToken: credentials.validationToken,
            };
          }
        } catch (error) {
          return null;
        }
      },
    }),
  ],
});
