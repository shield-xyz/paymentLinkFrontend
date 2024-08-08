'use server';

import { env } from '@/config';
import { auth } from '@/lib/auth';
import {
  NOTIFICATION_STATUS,
  fetchWithToken,
  handleError,
  validateResponse,
} from '@/lib/utils';

export async function updateNotificationStatus({ notificationId, status }) {
  try {
    const session = await auth();
    const token = session?.accessToken;

    if (!Object.values(NOTIFICATION_STATUS).includes(status)) {
      throw new Error('Invalid status provided');
    }

    const res = await fetchWithToken(
      `${env.NEXT_PUBLIC_API_URL}/api/notifications/${notificationId}`,
      token,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      },
    );

    const { response: data } = await validateResponse(
      res,
      'Error putting notification seen',
    );

    return data;
  } catch (error) {
    handleError(error, 'Could not put notification seen');
  }
}
