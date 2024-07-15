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
      ...credentials,
      accessToken: data.token,
      email: data.email,
      id: data._id,
      logo,
      name: data.user_name,
      verify: data.verify,
    };
  } catch (error) {
    handleError(error, 'Could not login');
  }
}
