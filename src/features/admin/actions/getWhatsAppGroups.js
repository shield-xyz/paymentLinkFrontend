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

    const sortedData = data.data?.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });

    return sortedData;
  } catch (error) {
    console.error('Could not get WhatsApp Groups', error);
    return [];
  }
}
