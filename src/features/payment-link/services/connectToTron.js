import { toast } from 'sonner';

import { handleError } from '@/lib/utils';

export const connectToTronLink = async () => {
  try {
    if (!window.tronWeb) {
      toast.error('TronLink is not installed');
      return null;
    }

    let user = await window.tronLink.request({
      method: 'tron_requestAccounts',
    });

    const maxAttempts = 50;
    let attempts = 0;

    while (!window.tronWeb.ready && attempts < maxAttempts) {
      await new Promise((resolve) => setTimeout(resolve, 100));
      attempts++;
    }

    if (attempts === maxAttempts) {
      throw new Error(
        'TronWeb is not ready. Please check your TronLink extension.',
      );
    }

    if (user.code === 200) {
      const tronWebInstance = window.tronWeb;
      const address = tronWebInstance.defaultAddress.base58;
      const nodeInfo = await tronWebInstance.trx.getNodeInfo();
      const network = nodeInfo.configNodeInfo.network_id;

      return {
        tronWeb: tronWebInstance,
        address,
        network,
      };
    } else {
      return { tronWeb: null, address: null };
    }
  } catch (error) {
    handleError(error);
  }
};
