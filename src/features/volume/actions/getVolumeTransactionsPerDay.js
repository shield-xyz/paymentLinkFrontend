'use server';

import { format, startOfWeek } from 'date-fns';

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

    const startDate = new Date('2023-11-09');
    const transactionsFrom =data;
    //  data.filter((transaction) => {
    //   const date = new Date(transaction.date);
    //   return compareAsc(date, startDate) > 0;
    // });

    const groupedByWeek =transactionsFrom.reduce(
      (acc, { date, totalReceivedAmount }) => {
        // const dateObj = new Date(date);
        // const startOfTheWeek = startOfWeek(dateObj, { weekStartsOn: 1 }); // Adjust to Monday as the first day of the week
        // const weekKey = format(startOfTheWeek, 'MM-dd-yyyy');

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
