import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { login, loginWithFootprint } from '@/features/auth';

import { getLogoUrl } from './utils';
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

// {
//   data: {
//     response: {
//       _id: '66b401c1c7114494486103d8',
//       user_name: 'Sandbox',
//       email: 'sandbox@onefootprint.com',
//       token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YjQwMWMxYzcxMTQ0OTQ0ODYxMDNkOCIsImlhdCI6MTcyMzExNjU3MCwiZXhwIjoxNzIzMTI3MzcwfQ.yXfr3Dwtq8UL2E17RJ1bHAg6HUymN75Th05-6j6H8jU',
//       logo: 'uploads/default.jpg',
//       company: '',
//       apiKey: 'fe6c3e690e97caa9a9d4eb46121de1ad',
//       verify: false,
//       footId: 'fp_id_test_Cfwd5OaEXOoSOkPWc6bCd4',
//       admin: false
//     },
//     status: 'success'
//   }
// }
