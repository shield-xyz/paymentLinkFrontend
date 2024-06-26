import { toast } from 'sonner';

import { savePayment } from '../actions';

import { handleSubmissionError } from '@/lib/utils';

export const sendTRC20 = async ({
  tronWeb,
  contractAddress,
  toAddress,
  amount,
  id,
  email,
  name,
  assetId,
}) => {
  if (!tronWeb) {
    toast.error('TronWeb instance is required');
    return;
  }

  console.log({
    tronWeb,
    contractAddress,
    toAddress,
    amount,
    id,
    name,
    email,
    assetId,
  });

  try {
    toast.info('Waiting for the transaction...', {
      duration: 5000,
    });
    const contract = await tronWeb.contract().at(contractAddress);
    console.log({ contract });
    const hash = await contract.transfer(toAddress, amount).send();
    console.log({ hash });
    console.log('TRC20 Token transfer successful:', hash);

    await savePayment({
      id,
      hash,
      assetId,
      email,
      name,
    });

    toast.success(`Token transfer successfull: ${hash}`);
    return hash;
  } catch (error) {
    console.log({ error });
    handleSubmissionError(error, 'Error sending TRC20 token');
  }
};
