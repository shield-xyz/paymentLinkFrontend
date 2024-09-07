'use server';

import { env } from '@/config';
import { handleReturnError, validateResponse } from '@/lib/utils';

export async function savePayment({
  id,
  hash,
  assetId,
  email,
  name,
}: {
  id: string;
  hash: string;
  assetId: string;
  email?: string;
  name?: string;
}) {
  try {
    let payload: object = {
      hash,
      assetId,
    };

    if (email && name) {
      payload = {
        ...payload,
        email,
        name,
      };
    }

    const res = await fetch(
      `${env.NEXT_PUBLIC_API_URL}/api/linkPayments/save/${id}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      },
    );

    const { response: data } = await validateResponse(
      res,
      'Error saving payment',
    );

    return data;
  } catch (error) {
    return handleReturnError(error, 'Error saving payment');
  }
}
