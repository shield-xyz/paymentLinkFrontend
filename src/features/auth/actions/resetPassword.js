'use server';

import { env } from '@/config';
import { handleReturnError, validateResponse } from '@/lib/utils';

export async function resetPassword({ password, resetToken }) {
  console.log({ password, resetToken });
  try {
    const res = await fetch(
      `${env.NEXT_PUBLIC_API_URL}/api/auth/reset-password/${resetToken}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ password }),
      },
    );

    const data = await validateResponse(res, 'Error resetting password');

    return { data };
  } catch (error) {
    return handleReturnError(error, 'Error resetting password');
  }
}
