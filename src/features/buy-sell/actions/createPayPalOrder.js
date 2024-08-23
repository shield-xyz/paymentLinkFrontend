import { env } from '@/config';
import { fetchWithToken } from '@/lib/utils';

export async function createPayPalOrder(token, encoded, wallet) {
  if (!encoded || !wallet) {
    console.log('Missing required parameters', encoded, wallet);
  }

  const res = await fetchWithToken(
    `${env.NEXT_PUBLIC_API_URL}/api/quotes/onramp/paypal`,
    token,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ encoded, wallet }),
    },
  );

  const data = await res.json();

  return data.id;
}
