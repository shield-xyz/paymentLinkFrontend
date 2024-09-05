'use server';

import { env } from '@/config';
import { fetchWithToken } from '@/lib/utils';

export async function createOffRampOrder(token, encoded, networkId) {
  if (!token || !encoded || !networkId) {
    console.log('Missing required parameters', token, encoded, networkId);
  }

  const res = await fetchWithToken(
    `${env.NEXT_PUBLIC_API_URL}/api/quotes/offramp`,
    token,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ encoded, networkId }),
    },
  );

  const data = await res.json();

  if (data.msg === 'unverified user') {
    return { status: 'unverified' };
  }

  return data;
}
