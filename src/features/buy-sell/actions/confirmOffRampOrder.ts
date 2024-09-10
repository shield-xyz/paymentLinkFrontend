'use server';

import { env } from '@/config';
import { fetchWithToken } from '@/lib/utils';

export async function confirmOffRampOrder(token, id, hash) {
  if (!token || !id || !hash) {
    console.log('Missing required parameters', token, id, hash);
  }

  const res = await fetchWithToken(
    `${env.NEXT_PUBLIC_API_URL}/api/quotes/offramp/completed`,
    token,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, hash }),
    },
  );

  const data = await res.json();

  if (data.msg === 'unverified user') {
    return { status: 'unverified' };
  }

  return { status: 'success' };
}
