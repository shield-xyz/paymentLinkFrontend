'use server';

import { env } from '@/config';
import { fetchWithToken, handleError } from '@/lib/utils';

export async function fetchLinks(token) {
  try {
    const res = await fetchWithToken(
      `${env.NEXT_PUBLIC_API_URL}/api/linkPayments/`,
      token,
      {
        method: 'GET',
      },
    );


    const data = await res.json(); // Parse the response JSON

    if (!data) {
      throw new Error('No data returned from API');
    }

    return data;
  } catch (error) {
    handleError(error, 'Could not fetch payment links');
  }
}
