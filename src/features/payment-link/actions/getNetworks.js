'use server';

import { env } from '@/config';
import { validateResponse } from '@/lib/utils';

export async function getNetworks() {
  try {
    const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/networks/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const { response: data } = await validateResponse(
      res,
      'Error getting networks',
    );

    return data;
  } catch (error) {
    console.error('Could not get networks', error);
    return [];
  }
}
