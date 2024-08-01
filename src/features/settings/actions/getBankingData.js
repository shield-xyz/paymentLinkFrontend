'use server';

import { env } from '@/config';
import { getServerAuthSession } from '@/lib/auth';
import { fetchWithToken, validateResponse } from '@/lib/utils';

export async function getBankingData() {
  try {
    const session = await getServerAuthSession();
    const token = session?.accessToken;

    const res = await fetchWithToken(
      `${env.NEXT_PUBLIC_API_URL}/api/banks`,
      token,
      {
        method: 'GET',
      },
    );

    const { response: data } = await validateResponse(
      res,
      'Error fetching banking data',
    );

    return data;
  } catch (error) {
    console.error('Error fetching banking data', error);
    return {};
  }
}
