'use server';

import { env } from '@/config';
import { validateResponse } from '@/lib/utils';

export async function getVolumeTransactionsPerDay() {
  try {
    const res = await fetch(
      `${env.NEXT_PUBLIC_API_URL}/api/volumetransactions/totalReceivedAmountByDay`,
      {
        method: 'GET',
      },
    );

    const { response: data } = await validateResponse(
      res,
      'Error fetching transactions',
    );

    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
