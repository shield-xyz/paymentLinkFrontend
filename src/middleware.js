import { withAuth } from 'next-auth/middleware';

const allowedPaths = [
  '/login',
  '/register',
  '/forgot-password',
  '/paylink',
  '/reset-password/**',
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

export default withAuth(
  function middleware() {
    // console.log('Middleware - Token:', req.nextauth.token);
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        console.log(req.nextUrl.pathname);
        const isMiddlewareAllowed = isPathAllowed(req.nextUrl.pathname);

        if (isMiddlewareAllowed) {
          return true;
        } else {
          return token;
        }
      },
    },
    pages: {
      signIn: '/login',
      error: '/error',
      signOut: '/',
    },
  },
);

export const config = { matcher: ['/:path*'] };
