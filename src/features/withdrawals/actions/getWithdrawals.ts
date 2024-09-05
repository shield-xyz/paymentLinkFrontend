'use server';

import { env } from '@/config';
import { fetchWithToken, validateResponse } from '@/lib/utils';

export async function getWithdrawals(token) {
  try {
    if (!token) {
      throw new Error('No token provided');
    }
    const res = await fetchWithToken(
      `${env.NEXT_PUBLIC_API_URL}/api/withdraws`,
      token,
      {
        method: 'GET',
      },
    );

    const { response: data } = await validateResponse(
      res,
      'Error fetching withdrawals',
    );

    const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));

    return sortedData;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getRampWithdrawals(token) {
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
      (transaction) => transaction.type === 'sell',
    );

    const sortedData = deposits.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    );

    return sortedData;
  } catch (error) {
    console.error(error);
    return [];
  }
}
