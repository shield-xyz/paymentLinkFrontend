'use server';

import { env } from '@/config';
import { validateResponse } from '@/lib/utils';

export async function getClientsAddress() {
  try {
    const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/clientsAddress/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': env.MASTER_API_KEY,
      },
    });

    const { response: data } = await validateResponse(
      res,
      'Error getting client addresses',
    );

    return data;
  } catch (error) {
    console.error('Could not get client addresses', error);
    return [];
  }
}
