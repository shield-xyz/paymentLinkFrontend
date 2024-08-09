'use server';

import { env } from '@/config';
import { handleReturnError, validateResponse } from '@/lib/utils';

export async function deleteClientAddress(_id) {
  try {
    const res = await fetch(
      `${env.NEXT_PUBLIC_API_URL}/api/clientsAddress/${_id}`,
      {
        method: 'DELETE',
        headers: {
          'x-api-key': env.MASTER_API_KEY,
          'Content-Type': 'application/json',
        },
      },
    );

    const data = await validateResponse(res, 'Error deleting Client Address');

    return data;
  } catch (error) {
    console.log({ error });
    return handleReturnError(error, 'Error deleting Client Address');
  }
}
