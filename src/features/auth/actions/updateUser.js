import { env } from '@/config';
import { fetchWithToken, handleError, validateResponse } from '@/lib/utils';

export async function updateUser(token, formData) {
  try {
    const res = await fetchWithToken(
      `${env.NEXT_PUBLIC_API_URL}/api/auth/user`,
      token,
      {
        method: 'PUT',
        body: formData,
      },
    );

    const { response: data } = await validateResponse(
      res,
      'Error updating user data',
    );

    return data;
  } catch (error) {
    handleError(error, 'Could not update user data');
  }
}
