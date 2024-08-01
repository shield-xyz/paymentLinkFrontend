'use server';

import { env } from '@/config';
import { handleReturnError, validateResponse } from '@/lib/utils';

export async function postForgotPassword({ email }) {
  try {
    const res = await fetch(
      `${env.NEXT_PUBLIC_API_URL}/api/auth/forgot-password`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ email }),
      },
    );

    const data = await validateResponse(res, 'Error sending recovery email');

    return { data };
  } catch (error) {
    return handleReturnError(error, 'Error sending recovery email');
  }
}
