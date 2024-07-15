'use server';

import { revalidatePath } from 'next/cache';

import { env } from '@/config';
import { fetchWithToken, handleError, validateResponse } from '@/lib/utils';

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

    const { response: data } = await validateResponse(
      res,
      'Error creating Link',
    );

    revalidatePath('/payment-links');

    return data;
  } catch (error) {
    handleError(error, 'Error payment link');
  }
}
