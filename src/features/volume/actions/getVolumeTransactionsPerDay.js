'use server';

import { compareAsc, format, startOfWeek } from 'date-fns';

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

    const startDate = new Date('01 Apr, 2024');
    const transactionsFrom = data.filter((transaction) => {
      const date = new Date(transaction.date);
      return compareAsc(date, startDate) > 0;
    });

    const groupedByWeek = transactionsFrom.reduce(
      (acc, { date, totalReceivedAmount }) => {
        const dateObj = new Date(date);
        const startOfTheWeek = startOfWeek(dateObj, { weekStartsOn: 1 }); // Adjust to Monday as the first day of the week
        const weekKey = format(startOfTheWeek, 'MM-dd-yyyy');

        if (!acc[weekKey]) {
          acc[weekKey] = 0;
        }
        acc[weekKey] += totalReceivedAmount;
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
