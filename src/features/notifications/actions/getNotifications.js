'use server';

import { env } from '@/config';
import { auth } from '@/lib/auth';
import { fetchWithToken, validateResponse } from '@/lib/utils';

export async function getNotifications() {
  try {
    const session = await auth();
    const token = session?.accessToken;

    if (!token) {
      throw new Error('No token provided');
    }
    const res = await fetchWithToken(
      `${env.NEXT_PUBLIC_API_URL}/api/notifications`,
      token,
      {
        method: 'GET',
      },
    );

    const { response: data } = await validateResponse(
      res,
      'Error getting notifications',
    );

    const sortedData = data.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return sortedData;
  } catch (error) {
    console.error('Error getting notifications', error);
    return null;
  }
}
