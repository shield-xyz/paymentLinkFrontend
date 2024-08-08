'use server';

import { env } from '@/config';
import { auth } from '@/lib/auth';
import { fetchWithToken, handleError, validateResponse } from '@/lib/utils';

export async function updateBankingData(formData) {
  try {
    console.log({ formData });
    const session = await auth();
    const token = session?.accessToken;

    const res = await fetchWithToken(
      `${env.NEXT_PUBLIC_API_URL}/api/banks`,
      token,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      },
    );

    const { response: data } = await validateResponse(
      res,
      'Error updating banking data',
    );

    console.log({ data });

    return data;
  } catch (error) {
    handleError(error, 'Error updating banking data');
  }
}
