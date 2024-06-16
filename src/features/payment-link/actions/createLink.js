'use server';

import { env } from '@/config';
import { fetchWithToken, handleError, validateResponse } from '@/lib/utils';

export async function createLink(linkData, token) {
  try {
    const res = await fetchWithToken(
      `${env.NEXT_PUBLIC_API_URL}/api/linkPayments/`,
      token,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(linkData),
      },
    );

    const { response: data } = await validateResponse(
      res,
      'Error creating Link',
    );

    console.log({ data });

    return data;
  } catch (error) {
    handleError(error, 'Could create payment link');
  }
}
