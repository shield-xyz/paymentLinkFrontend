'use server';

import { env } from '@/config';
import { validateResponse } from '@/lib/utils';

export async function getPaymentLinkData(id) {
  try {
    const res = await fetch(
      `${env.NEXT_PUBLIC_API_URL}/api/linkPayments/get/${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const { response: data } = await validateResponse(
      res,
      'Error getting payment Link',
    );

    return data;
  } catch (error) {
    console.error(error);
  }
}
