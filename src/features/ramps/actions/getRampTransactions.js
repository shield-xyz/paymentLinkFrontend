'use server';

import { env } from '@/config';
import { fetchWithToken } from '@/lib/utils';

export async function getRampTransactions(token) {
  try {
    if (!token) {
      throw new Error('No token provided');
    }
    const res = await fetchWithToken(
      `${env.NEXT_PUBLIC_API_URL}/api/buysell/`,
      token,
      {
        method: 'GET',
      },
    );

    const { status, response } = await res.json();

    if (status !== 'success') {
      throw new Error('Error fetching transactions');
    }

    const sortedData = response.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    );

    return sortedData;
  } catch (error) {
    console.error(error);
    return [];
  }
}
