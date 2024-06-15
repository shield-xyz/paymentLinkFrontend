import { withAuth } from 'next-auth/middleware';

const allowedPaths = ['/login', '/register', '/forgot-password'];

export default withAuth(
  function middleware(req) {
    console.log('middleware');
    console.log(req.nextauth.token);
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
