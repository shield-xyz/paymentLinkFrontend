'use client';

import { toast } from 'sonner';

import { handleError } from '@/lib/utils';

import { savePayment } from '../actions';

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

        if ('error' in res) {
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
    return new Promise((resolve, reject) => {
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
            return `Verification successful: ${result}`;
          },
          error: (error) => {
            reject(`The transfer was not successful: ${error}`);
            return `Verification failed: ${error.message}`;
          },
        },
      );
    });
  };

  return {
    handleManualTransfer,
  };
};
