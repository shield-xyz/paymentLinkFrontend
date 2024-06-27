import { toast } from 'sonner';

import { savePayment } from '../actions';

import { handleError } from '@/lib/utils';

export const useManualPayment = () => {
  const manualTransfer = async ({
    account,
    amount,
    toAddress,
    tokenAddress,
    id,
    assetId,
    name,
    email,
    paymentHash,
  }) => {
    console.log({
      account,
      amount,
      toAddress,
      tokenAddress,
    });
    if (paymentHash) {
      try {
        await savePayment({
          id,
          hash: paymentHash,
          assetId,
          email,
          name,
        });

        return paymentHash;
      } catch (error) {
        handleError(error, 'Transfer failed');
      }
    } else {
      throw new Error('Payment hash is required');
    }
  };

  const handleManualTransfer = ({
    account,
    amount,
    toAddress,
    tokenAddress,
    id,
    assetId,
    name,
    email,
    paymentHash,
  }) => {
    return new Promise((resolve) => {
      toast.promise(
        manualTransfer({
          account,
          amount,
          toAddress,
          tokenAddress,
          id,
          assetId,
          name,
          email,
          paymentHash,
        }),
        {
          loading: 'Verifying payment...',
          success: (result) => {
            resolve(result);
            return `Transfer successful: ${result}`;
          },
          error: (error) => {
            resolve(`The transfer was not successful: ${error}`);
            return `Transfer failed: ${error}`;
          },
        },
      );
    });
  };

  return {
    handleManualTransfer,
  };
};
