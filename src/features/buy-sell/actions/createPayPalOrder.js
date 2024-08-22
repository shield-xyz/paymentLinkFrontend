import { env } from '@/config';
import { fetchWithToken } from '@/lib/utils';

export async function createPayPalOrder(token, encoded) {
  const res = await fetchWithToken(
    `${env.NEXT_PUBLIC_API_URL}/api/quotes/onramp/paypal`,
    token,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ encoded }),
    },
  );

  const data = await res.json();

  return data.id;
}
