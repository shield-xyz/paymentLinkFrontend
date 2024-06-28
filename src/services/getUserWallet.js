'use server';

import { env } from '@/config';
import { validateResponse } from '@/lib/utils';

export async function getUserWallet({ userId, networkId }) {
  try {
    console.log({ userId, networkId });
    if (!userId || !networkId) {
      throw new Error('No userId or networkId provided');
    }

    const res = await fetch(
      `${env.NEXT_PUBLIC_API_URL}/api/walletsUser/wallet/${userId}/${networkId}`,
      {
        method: 'GET',
      },
    );

    console.log({ res });

    const { response: data } = await validateResponse(
      res,
      'Error fetching wallet user',
    );

    return data;
  } catch (error) {
    console.error('Error fetching wallet user', error);
    return null;
  }
}

// {{ruta}}api/walletsUser/wallet/667477f6769e23782b7c2984/ethereum
// response => networkId, walletId a donde transferir
