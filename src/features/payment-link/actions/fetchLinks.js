'use server';

import { env } from '@/config';
import { fetchWithToken } from '@/lib/utils';

export async function fetchLinks(token) {
  try {
    if (!token) {
      throw new Error('No token provided');
    }

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

    const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));

    return sortedData;
  } catch (error) {
    console.error(error);
    return [];
  }
}
