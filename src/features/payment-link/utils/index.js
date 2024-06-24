import { toast } from 'sonner';

import { env } from '@/config';

export const getFinalPaymentLink = (id) => {
  return `${env.NEXT_PUBLIC_APP_URL}/paylink?id=${id}`;
};

export const copyCode = async (link, message) => {
  try {
    // eslint-disable-next-line no-undef
    await navigator.clipboard.writeText(link);
    toast.success(message);
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    }
  }
};
