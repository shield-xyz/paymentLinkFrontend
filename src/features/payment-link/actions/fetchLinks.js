'use server';

import { env } from '@/config';
import { fetchWithToken, handleError, validateResponse } from '@/lib/utils';

export async function fetchLinks(token) {
  try {
    console.log('Token:', token); // Log the token
    const res = await fetchWithToken(
      `${env.NEXT_PUBLIC_API_URL}/api/linkPayments/`,
      token,
      {
        method: 'GET',
      },
    );

    console.log('Response:', res); // Log the response

    const { response: data } = await validateResponse(
      res,
      'Error fetching links',
    );

    console.log({ data });

    return data;
  } catch (error) {
    handleError(error, 'Could not fetch payment links');
  }
}
