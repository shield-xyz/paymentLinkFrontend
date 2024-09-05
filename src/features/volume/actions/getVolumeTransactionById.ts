'use server';

import { env } from '@/config';
import { validateResponse } from '@/lib/utils';

export async function getVolumeTransactionById(id) {
  try {
    const res = await fetch(
      `${env.NEXT_PUBLIC_API_URL}/api/volumetransactions/${id}`,
      {
        headers: {
          'x-api-key': env.MASTER_API_KEY,
        },
        method: 'GET',
      },
    );

    const { response: data } = await validateResponse(
      res,
      'Error fetching transaction' + id,
    );

    return data;
  } catch (error) {
    console.error(error);
  }
}
