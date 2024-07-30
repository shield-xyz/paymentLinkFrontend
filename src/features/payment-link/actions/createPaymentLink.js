'use server';

import { revalidatePath } from 'next/cache';

import { env } from '@/config';
import {
  fetchWithToken,
  handleReturnError,
  validateResponse,
} from '@/lib/utils';

export async function createPaymentLink(linkData, token) {
  try {
    const res = await fetchWithToken(
      `${env.NEXT_PUBLIC_API_URL}/api/linkPayments/`,
      token,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(linkData),
      },
    );

    const data = await validateResponse(res, 'Error creating Link');

    revalidatePath('/payment-links');

    return data.response;
  } catch (error) {
    console.log({ error });
    return handleReturnError(error, 'Error creating Link');
  }
}
