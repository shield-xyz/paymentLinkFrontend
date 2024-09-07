'use server';

import { env } from '@/config';
import { fetchWithToken } from '@/lib/utils';

export async function getDeposits(token) {
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

    const deposits = response.filter(
      (transaction) => transaction.type === 'buy',
    );

    const sortedData = deposits.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

    return sortedData;
  } catch (error) {
    console.error(error);
    return [];
  }
}
