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

    const transactionsFrom = data;
    const groupedByWeek = transactionsFrom.reduce(
      (acc, { date, totalReceivedAmount }) => {
        if (!acc[date]) {
          acc[date] = 0;
        }
        acc[date] += totalReceivedAmount;
        return acc;
      },
      {},
    );

    return groupedByWeek;
  } catch (error) {
    console.error(error);
    return [];
  }
}
