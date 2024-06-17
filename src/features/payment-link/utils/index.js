import { env } from '@/config';

export const getFinalPaymentLink = (id) => {
  return `${env.NEXT_PUBLIC_APP_URL}/paylink?id=${id}`;
};
