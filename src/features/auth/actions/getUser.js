import { env } from '@/config';
import { fetchWithToken, handleError, validateResponse } from '@/lib/utils';

export async function getUser(token) {
  try {
    if (!token) {
      throw new Error('No token provided');
    }
    const res = await fetchWithToken(
      `${env.NEXT_PUBLIC_API_URL}/api/merchants/me`,
      token,
      {
        method: 'GET',
      },
    );

    const { response: data } = await validateResponse(
      res,
      'Error fetching user data',
    );

    return data;
  } catch (error) {
    handleError(error, 'Could not fetch user data');
  }
}
