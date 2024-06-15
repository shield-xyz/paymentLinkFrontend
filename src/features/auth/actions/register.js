'use server';

import { env } from '@/config';
import { handleError, validateResponse } from '@/lib/utils';

export async function register(input) {
  try {
    const { email, password } = input;

    const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    validateResponse(res, 'Error registering user');

    const user = await res.json();

    console.log({ user });

    return {
      user,
    };
  } catch (error) {
    handleError(error, 'Could not register');
  }
}
