'use server';

import { env } from '@/config';
import { handleError, validateResponse } from '@/lib/utils';

export async function addWallet({ id, wallet }) {
  try {
    const res = await fetch(
      `${env.NEXT_PUBLIC_API_URL}/api/linkPayments/walletTriedpayment`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, wallet }),
      },
    );

    const { response: data } = await validateResponse(
      res,
      'Error adding wallet',
    );

    return data;
  } catch (error) {
    handleError(error, 'Error adding wallet');
  }
}
