import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { login, loginWithFootprint } from '@/features/auth';

import { authConfig } from '../../auth.config';

// const SignInSchema = z.object({
//   validationToken: z.string().startsWith('vtok_').length(39),
// });

// const ValidationResponseSchema = z.object({
//   user_auth: z.object({
//     fp_id: z.string(),
//     auth_events: z.array(
//       z.object({
//         kind: z.string(),
//         timestamp: z.string(),
//       }),
//     ),
//   }),
// });

export const {
  handlers,
  signIn,
  signOut,
  auth: getServerAuthSession,
} = NextAuth({
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
          const res = await loginWithFootprint(credentials);
          console.log({ res });

          // return the user
          return {
            isRegistered: false,
          };
        } catch (error) {
          return null;
        }
      },
    }),
  ],
});
