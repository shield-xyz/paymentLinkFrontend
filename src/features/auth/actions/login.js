'use server';

import { env } from '@/config';
import { getLogoUrl, handleError, validateResponse } from '@/lib/utils';

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

    const { response: data } = await validateResponse(
      res,
      'Error authenticating user',
    );

    const logo = getLogoUrl(data.logo);

    return {
      email: data.email,
      name: data.user_name,
      id: data._id,
      accessToken: data.token,
      logo,
      ...credentials,
    };
  } catch (error) {
    handleError(error, 'Could not login');
  }
}
