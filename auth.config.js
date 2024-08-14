import { env } from '@/config';
import { getLogoUrl } from '@/lib/utils';

const allowedPaths = [
  '/forgot-password',
  '/login',
  '/login/**',
  '/paylink',
  '/register',
  '/reset-password/**',
  '/getshield/volume',
];

function isPathAllowed(pathname) {
  return allowedPaths.some((allowedPath) => {
    if (allowedPath.endsWith('**')) {
      // Remove the '**' and check if the pathname starts with the base path
      const basePath = allowedPath.slice(0, -2);
      return pathname.startsWith(basePath);
    }
    return pathname === allowedPath;
  });
}

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  secret: env.NEXTAUTH_SECRET,
  session: {
    maxAge: 36000, //
  },
  callbacks: {
    async signIn({ user }) {
      const { isRegistered, validationToken } = user;
      if (isRegistered) {
        return true;
      } else {
        return `/register?validationToken=${validationToken}`;
      }
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isMiddlewareAllowed = isPathAllowed(nextUrl.pathname);
      if (isMiddlewareAllowed) {
        return true;
      } else if (isLoggedIn) {
        return true;
      }
      return false;
    },
    async jwt({ token, user, trigger, session }) {
      const now = Date.now();
      if (user) {
        // Initial login, setting up token details and last activity time
        token.accessToken = user.token;
        token.email = user.email;
        token.id = user.id;
        token.lastActivity = now; // Store the current timestamp
        token.logo = user.logo;
        token.name = user.name;
        token.verify = user.verify;
        token.isRegistered = user.isRegistered;
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
        session.user.isRegistered = token.isRegistered;
        session.user.admin = token.admin;
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
  providers: [],
};
