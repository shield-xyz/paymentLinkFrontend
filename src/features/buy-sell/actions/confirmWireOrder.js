'use server';

import { env } from '@/config';
import { fetchWithToken } from '@/lib/utils';

export async function confirmWireOrder(token, id) {
  if (!token || !id) {
    console.log('Missing required parameters', token, id);
  }

  const res = await fetchWithToken(
    `${env.NEXT_PUBLIC_API_URL}/api/quotes/onramp/wire/completed`,
    token,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    },
  );

  const data = await res.json();

  if (data.msg === 'unverified user') {
    return { status: 'unverified' };
  }

  return { status: 'success' };
}
