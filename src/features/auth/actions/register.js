'use server';

import { env } from '@/config';
import { handleError, validateResponse } from '@/lib/utils';

export async function register(formData) {
  try {
    const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
      method: 'POST',
      body: formData,
    });

    const data = await validateResponse(res, 'Error registering user');

    return { data };
  } catch (error) {
    handleError(error, 'Could not register');
  }
}
