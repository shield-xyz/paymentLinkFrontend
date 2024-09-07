declare module 'next-auth' {
  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User {
    admin: boolean;
    isRegistered: boolean;
    logo: string;
    name: string;
    token: string;
    validationToken: string;
    verify: boolean;
  }
  /**
   * The shape of the account object returned in the OAuth providers' `account` callback,
   * Usually contains information about the provider being used, like OAuth tokens (`access_token`, etc).
   */
  interface Account {}

  /**
   * Returned by `useSession`, `auth`, contains information about the active session.
   */
  interface Session {
    accessToken: string;
    isExpired: boolean;
  }
}

// The `JWT` interface can be found in the `next-auth/jwt` submodule
import 'next-auth/jwt';

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    accessToken: string;
    admin: boolean;
    email: string;
    id: string;
    isRegistered: boolean;
    lastActivity: number;
    logo: string;
    name: string;
    verify: boolean;
  }
}

declare global {
  interface Window {
    tronLink: any;
    tronWeb: any;
  }
}
