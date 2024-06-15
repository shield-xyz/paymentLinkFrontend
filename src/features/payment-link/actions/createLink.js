'use server';

import { env } from '@/config';
import { handleError, validateResponse } from '@/lib/utils';

export async function createLink(linkData) {
  try {
    const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(linkData),
    });

    const { response: data } = await validateResponse(
      res,
      'Error creating Link',
    );

    console.log({ data });

    return data;
  } catch (error) {
    handleError(error, 'Could create payment link');
  }
}
