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

    const data = await validateResponse(res, 'Error authenticating user');

    const accessToken = data.token;

    return {
      name: data.user_name,
      id: data._id,
      ...credentials,
      accessToken,
    };
  } catch (error) {
    handleError(error, 'Could not login');
  }
}
