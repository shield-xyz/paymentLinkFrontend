import { toast } from 'sonner';

import { savePayment } from '../actions';

import { handleSubmissionError } from '@/lib/utils';

export const sendTRC20 = async (
  tronWeb,
  contractAddress,
  toAddress,
  amount,
  id,
) => {
  if (!tronWeb) {
    toast.error('TronWeb instance is required');
    return;
  }

  console.log({ tronWeb, contractAddress, toAddress, amount, id });

  try {
    toast.info('Waiting for the transaction...', {
      duration: 5000,
    });
    const contract = await tronWeb.contract().at(contractAddress);
    console.log({ contract });
    const transaction = await contract.transfer(toAddress, amount).send();
    console.log({ transaction });
    console.log('TRC20 Token transfer successful:', transaction);

    await savePayment(id, transaction);

    toast.success(`Token transfer successfull: ${transaction}`);
    return transaction;
  } catch (error) {
    console.log({ error });
    handleSubmissionError(error, 'Error sending TRC20 token');
  }
};
