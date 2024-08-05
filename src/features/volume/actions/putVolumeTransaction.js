'use server';

import { revalidatePath } from 'next/cache';

import { env } from '@/config';
import { handleReturnError, validateResponse } from '@/lib/utils';

export async function putVolumeTransaction(volumeTransaction) {
  try {
    const res = await fetch(
      `${env.NEXT_PUBLIC_API_URL}/api/volumetransactions/${volumeTransaction._id}`,
      {
        method: 'PUT',
        headers: {
          'x-api-key': env.MASTER_API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(volumeTransaction),
      },
    );

    const data = await validateResponse(res, 'Error updating transaction');

    revalidatePath('/volume');

    return data;
  } catch (error) {
    console.log({ error });
    return handleReturnError(error, 'Error updating transaction');
  }
}
