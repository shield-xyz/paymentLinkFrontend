import { env } from '@/config';
import { fetchWithToken } from '@/lib/utils';

export async function submitRampOrder(token, side, order) {
  try {
    const res = await fetchWithToken(
      `${env.NEXT_PUBLIC_API_URL}/api/buysell/${side}`,
      token,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      },
    );

    return await res.json();
  } catch (error) {
    console.error('Could not submit sell order', error);
    return { error: 'Could not submit sell order' };
  }
}
