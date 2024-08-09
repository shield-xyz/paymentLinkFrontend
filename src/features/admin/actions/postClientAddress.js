'use server';

import { revalidatePath } from 'next/cache';

import { env } from '@/config';
import { handleReturnError, validateResponse } from '@/lib/utils';

export async function postClientAddress(clientAddress) {
  try {
    const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/clientsAddress/`, {
      method: 'POST',
      headers: {
        'x-api-key': env.MASTER_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(clientAddress),
    });

    const data = await validateResponse(res, 'Error creating Client Address');

    revalidatePath('/client-addresses');

    return data;
  } catch (error) {
    console.log({ error });
    return handleReturnError(error, 'Error creating Client Address');
  }
}
