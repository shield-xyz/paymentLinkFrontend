'use server';

import { env } from '@/config';
import { handleError, validateResponse } from '@/lib/utils';

export async function postClient({ email, password, paymentLinkId }) {
  try {
    const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/clients`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        paymentLinkId,
      }),
    });

    const { response: data } = await validateResponse(
      res,
      'Error saving client',
    );

    return data;
  } catch (error) {
    handleError(error, 'Error saving client');
  }
}
