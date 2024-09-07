'use server';

import { revalidatePath } from 'next/cache';

import { env } from '@/config';
import { handleReturnError, validateResponse } from '@/lib/utils';

export async function postVolumeTransaction(volumeTransaction) {
  try {
    const res = await fetch(
      `${env.NEXT_PUBLIC_API_URL}/api/volumetransactions/`,
      {
        method: 'POST',
        headers: {
          'x-api-key': env.MASTER_API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(volumeTransaction),
      },
    );

    const data = await validateResponse(res, 'Error creating transaction');

    revalidatePath('/volume');

    return data;
  } catch (error) {
    console.log({ error });
    return handleReturnError(error, 'Error creating transaction');
  }
}
