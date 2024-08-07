'use server';

import { env } from '@/config';
import { fetchWithToken, validateResponse } from '@/lib/utils';

export async function getBalances(token) {
  try {
    if (!token) {
      throw new Error('No token found');
    }

    const res = await fetchWithToken(
      `${env.NEXT_PUBLIC_API_URL}/api/balances`,
      token,
      {
        method: 'GET',
      },
    );

    const { response: data } = await validateResponse(
      res,
      'Error fetching balance',
    );

    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
