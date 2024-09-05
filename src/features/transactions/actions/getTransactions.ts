'use server';

import { env } from '@/config';
import { fetchWithToken, validateResponse } from '@/lib/utils';

export async function getTransactions(token) {
  try {
    if (!token) {
      throw new Error('No token provided');
    }
    const res = await fetchWithToken(
      `${env.NEXT_PUBLIC_API_URL}/api/transactions`,
      token,
      {
        method: 'GET',
      },
    );

    const { response: data } = await validateResponse(
      res,
      'Error fetching transactions',
    );

    const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));

    return sortedData;
  } catch (error) {
    console.error(error);
    return [];
  }
}
