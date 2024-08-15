'use server';

import { env } from '@/config';
import { validateResponse } from '@/lib/utils';

export async function getWhatsAppGroups() {
  try {
    const res = await fetch(
      `${env.NEXT_PUBLIC_API_URL}/api/clientsAddress/groupsWpp`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': env.MASTER_API_KEY,
        },
      },
    );

    const { response: data } = await validateResponse(
      res,
      'Error getting WhatsApp Groups',
    );

    if (!data.success) {
      throw new Error('Could not get WhatsApp Groups');
    }

    return data.data;
  } catch (error) {
    console.error('Could not get WhatsApp Groups', error);
    return [];
  }
}
