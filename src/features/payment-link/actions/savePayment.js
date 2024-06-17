'use server';

import { env } from '@/config';
import { handleError, validateResponse } from '@/lib/utils';

export async function savePayment({ id, hash }) {
  try {
    const res = await fetch(
      `${env.NEXT_PUBLIC_API_URL}/api/linkPayments/save/${id}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ hash }),
      },
    );

    const { response: data } = await validateResponse(
      res,
      'Error saving payment',
    );

    return data;
  } catch (error) {
    handleError(error, 'Error saving payment');
  }
}
