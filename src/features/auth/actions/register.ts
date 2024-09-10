'use server';

import { env } from '@/config';
import { handleReturnError, validateResponse } from '@/lib/utils';

export async function register(formData) {
  try {
    const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
      method: 'POST',
      body: formData,
    });

    const data = await validateResponse(res, 'Error registering user');

    return { data };
  } catch (error) {
    return handleReturnError(error, 'Error registering user');
  }
}
