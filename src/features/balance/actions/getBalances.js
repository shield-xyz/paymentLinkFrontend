'use server';

import { env } from '@/config';
import { getServerAuthSession } from '@/lib/auth';
import { fetchWithToken, validateResponse } from '@/lib/utils';

export async function getBalances() {
  try {
    const session = await getServerAuthSession();

    const res = await fetchWithToken(
      `${env.NEXT_PUBLIC_API_URL}/api/balances`,
      session?.accessToken,
      {
        method: 'GET',
      },
    );

    const { response: data } = await validateResponse(
      res,
      'Error fetching balance',
    );

    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
