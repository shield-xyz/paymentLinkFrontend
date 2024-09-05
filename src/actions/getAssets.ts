import { env } from '@/config';
import { validateResponse } from '@/lib/utils';

export async function getAssets() {
  try {
    const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/assets`, {
      method: 'GET',
    });

    const { response: data } = await validateResponse(
      res,
      'Error fetching assets',
    );

    return data;
  } catch (error) {
    console.error('Could not fetch assets', error);
    return [];
  }
}
