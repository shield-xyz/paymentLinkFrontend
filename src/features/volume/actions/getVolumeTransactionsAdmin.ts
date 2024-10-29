'use server';

import { env } from '@/config';
import { fetchWithToken, validateResponse } from '@/lib/utils';

export async function getVolumeTransactions(accessToken?: string) {
  try {
    const res = await fetchWithToken(
      `${env.NEXT_PUBLIC_API_URL}/api/volumetransactions`,
      accessToken,
      {
        headers: {
          'x-api-key': env.MASTER_API_KEY,
        },
        method: 'GET',
      },
    );

    const { response: data } = await validateResponse(
      res,
      'Error fetching transactions',
    );

    const sortedData = data.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    return sortedData;
  } catch (error) {
    console.error(error);
    return [];
  }
}
