import { toast } from 'sonner';

import { handleSubmissionError } from '@/lib/utils';

export const connectToTronLink = async () => {
  try {
    if (!window.tronWeb) {
      toast.error('TronLink is not installed');
      return null;
    }

    let user = await window.tronLink.request({
      method: 'tron_requestAccounts',
    });

    while (!window.tronWeb.ready) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    if (user.code === 200) {
      const tronWebInstance = window.tronWeb;
      const address = tronWebInstance.defaultAddress.base58;
      const nodeInfo = await tronWebInstance.trx.getNodeInfo();
      const network = nodeInfo.configNodeInfo.network_id;
      console.log(network, nodeInfo, 'network nodeinfo');

      return {
        tronWeb: tronWebInstance,
        address,
        network,
      };
    } else {
      return { tronWeb: null, address: null };
    }
  } catch (error) {
    handleSubmissionError(error, 'Error connecting to TronLink');
  }
};
