'use server';

import { env } from '@/config';
import {
  fetchWithToken,
  handleReturnError,
  validateResponse,
} from '@/lib/utils';

export async function deleteVolumeTransaction(_id, token) {
  try {
    const res = await fetchWithToken(
      `${env.NEXT_PUBLIC_API_URL}/api/volumetransactions/${_id}`,
      token,
      {
        method: 'DELETE',
        headers: {
          'x-api-key': env.MASTER_API_KEY,
          'Content-Type': 'application/json',
        },
      },
    );

    const data = await validateResponse(res, 'Error deleting transaction');

    return data;
  } catch (error) {
    console.log({ error });
    return handleReturnError(error, 'Error deleting transaction');
  }
}
