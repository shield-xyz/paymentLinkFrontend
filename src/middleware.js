import { withAuth } from 'next-auth/middleware';

const allowedPaths = ['/login', '/register', '/forgot-password', '/paylink'];

export default withAuth(
  function middleware(req) {
    console.log('Middleware - Token:', req.nextauth.token);
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const isMiddlewareAllowed = allowedPaths.includes(req.nextUrl.pathname);

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
