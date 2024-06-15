'use server';

import { env } from '@/config';
import { handleError, validateResponse } from '@/lib/utils';

export async function login(credentials) {
  try {
    const { email, password } = credentials || {};

    const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    validateResponse(res, 'Error authenticating user');

    const user = await res.json();
    console.log({ user });
    const accessToken = user.token;

    return {
      name: user.user_name,
      id: user._id,
      ...credentials,
      accessToken,
    };
  } catch (error) {
    handleError(error, 'Could not login');
  }
}
