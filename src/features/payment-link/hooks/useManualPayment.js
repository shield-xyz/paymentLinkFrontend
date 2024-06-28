'use client';

import { toast } from 'sonner';

import { savePayment } from '../actions';

import { handleError } from '@/lib/utils';

export const useManualPayment = () => {
  const manualTransfer = async ({ id, assetId, name, email, paymentHash }) => {
    if (paymentHash) {
      try {
        const res = await savePayment({
          id,
          hash: paymentHash,
          assetId,
          email,
          name,
        });

        if (res.error) {
          throw new Error(res.error);
        }

        return paymentHash;
      } catch (error) {
        handleError(error, 'Transfer failed');
      }
    } else {
      throw new Error('Payment hash is required');
    }
  };

  const handleManualTransfer = ({ id, assetId, name, email, paymentHash }) => {
    return new Promise((resolve) => {
      toast.promise(
        manualTransfer({
          assetId,
          email,
          id,
          name,
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
