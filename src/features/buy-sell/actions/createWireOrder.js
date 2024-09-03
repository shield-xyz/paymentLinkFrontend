'use server';

import { env } from '@/config';
import { fetchWithToken } from '@/lib/utils';

export async function createWireOrder(token, encoded, network, wallet) {
  if (!encoded || !wallet || !network) {
    console.log('Missing required parameters', encoded, wallet);
  }

  const res = await fetchWithToken(
    `${env.NEXT_PUBLIC_API_URL}/api/quotes/onramp/wire`,
    token,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ encoded, network, wallet }),
    },
  );

  const data = await res.json();

  if (data.msg === 'unverified user') {
    return { status: 'unverified' };
  }

  return { status: 'success', id: data.id };
}
