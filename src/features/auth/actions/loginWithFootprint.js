'use server';

import { env } from '@/config';
import { handleError } from '@/lib/utils';

export async function loginWithFootprint({ validationToken }) {
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

    console.log({ res });

    // const { response: data } = await validateResponse(
    //   res,
    //   'Error authenticating user',
    // );

    // console.log({ data });
    // return data;
    return res;
  } catch (error) {
    handleError(error, 'Could not login');
  }
}
