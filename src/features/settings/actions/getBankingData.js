// https://hub.getshield.xyz/banking?id%5B%5D=66846a9197fc06b5a4188b99

'use server';

import { validateResponse } from '@/lib/utils';

export async function getBankingData() {
  try {
    const res = await fetch(
      `https://hub.getshield.xyz/banking?id%5B%5D=66846a9197fc06b5a4188b99`,
      {
        method: 'GET',
      },
    );

    const { data } = await validateResponse(res, 'Error fetching banking data');

    return data;
  } catch (error) {
    console.error('Error fetching banking data', error);
    return null;
  }
}
