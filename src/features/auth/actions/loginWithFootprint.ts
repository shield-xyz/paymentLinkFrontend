'use server';

import { env } from '@/config';
import { handleError } from '@/lib/utils';

export async function loginWithFootprint({ validationToken }) {
  console.log('loginWithFootprint', { validationToken });
  try {
    const res = await fetch(
      `${env.NEXT_PUBLIC_API_URL}/api/auth/login-footprint`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ validation_token: validationToken }),
      },
    );

    // const { response: data } = await validateResponse(
    //   res,
    //   'Error authenticating user',
    // );

    const data = await res.json();
    console.log({ data });

    return data;
  } catch (error) {
    handleError(error, 'Could not login');
  }
}
