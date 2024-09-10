'use server';

import { env } from '@/config';
import {
  fetchWithToken,
  handleReturnError,
  validateResponse,
} from '@/lib/utils';

export async function getUserAuthToken(accessToken) {
  try {
    const res = await fetchWithToken(
      `${env.NEXT_PUBLIC_API_URL}/api/users/foot/token/${env.NEXT_PUBLIC_FOOTPRINT_KYB_PB_KEY}`,
      accessToken,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const data = await validateResponse(res, 'Error creating transaction');
    // console.log({ res });
    return data;
  } catch (error) {
    console.log({ error });
    return handleReturnError(error, 'Error creating transaction');
  }
}
