'use client';

import copy from 'copy-to-clipboard';
import { useSession } from 'next-auth/react';
import QRCode from 'qrcode.react';
import { useState } from 'react';
import { toast } from 'sonner';

import { submitRampOrder } from '../actions';
import { useStore } from '../store';

import { Icons } from '@/components';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Spinner from '@/components/ui/spinner';
import { formatCryptoHash } from '@/lib/utils';

export const WaitingForPaymentForm = ({ handleChangeStep }) => {
  const { data } = useSession();

  const [isLoading, setIsLoading] = useState(false);

  const {
    reset,
    setSuccess,
    side,
    selectedNetwork,
    selectedAsset,
    amount,
    hash,
    clientDepositAddress,
    bankName,
    accountNumber,
    routingNumber,
    beneficiaryName,
    country,
    state,
    city,
    streetAddress,
    zipCode,
    setHash,
  } = useStore();

  const handleSubmit = () => {
    setIsLoading(true);

    const order =
      side === 'sell'
        ? {
            status: 'initiated',
            bankDetails: {
              bankName,
              accountNumber,
              routingNumber,
              beneficiaryName,
              country,
              state,
              city,
              streetAddress,
              zipCode,
            },
            transactionDetails: {
              amountToTransfer: amount,
              transactionHash: hash,
              networkId: selectedNetwork.networkId,
              assetId: selectedAsset.assetId,
            },
          }
        : {
            status: 'initiated',
            transactionDetails: {
              walletAddress: clientDepositAddress,
              amountTransferred: amount,
              networkId: selectedNetwork.networkId,
              assetId: selectedAsset.assetId,
            },
          };

    submitRampOrder(data.accessToken, side, order)
      .then((data) => {
        if (data.status === 'success') {
          setSuccess(true);
          handleChangeStep();
          reset();
        } else {
          toast.warning('Something went wrong. Please try again.');
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="rounded-2xl border p-8">
      {side === 'buy' ? (
        <div>
          <div className="text-black/30">Bank Transfer</div>
          <div className="mt-4 flex flex-col gap-2">
            <span>
              <b>Beneficiary Name:</b> Xellar Technologies Inc.
            </span>
            <span>
              <b>Account Number:</b> 202415019079
            </span>
            <span>
              <b>Beneficiary Address:</b> 701 Tillery Street Unit 12, 2563,
              Austin, TX 78702
            </span>
            <span>
              <b>Routing Number:</b> 091311229
            </span>
            <span>
              <b>Bank Name:</b> Choice Financial Group
            </span>
            <span>
              <b>Bank Address:</b> 4501 23rd Avenue S, Fargo, ND 58104
            </span>
          </div>
        </div>
      ) : (
        <div>
          <div className="text-black/30">Scan/Send Deposit</div>
          <div className="flex items-center justify-center p-8">
            <QRCode value={selectedNetwork.deposit_address} size={200} />
          </div>
          <div className="mt-4 flex justify-between gap-8">
            <div className="text-black/60">Address</div>
            <div className="flex gap-4">
              <div className='hidden sm:block'>{selectedNetwork.deposit_address}</div>
              <div className='block sm:hidden'>{formatCryptoHash(selectedNetwork.deposit_address)}</div>

              <button
                onClick={() => {
                  copy(selectedNetwork.deposit_address);
                  toast.success('Address copied');
                }}
              >
                <Icons.copy />
              </button>
            </div>
          </div>
          <div className="mb-4 mt-4 flex justify-between">
            <div className="text-black/60">Total amount</div>
            <div className="flex gap-2">
              <div>
                {amount} {selectedAsset.symbol}
              </div>
            </div>
          </div>
          <Input
            label="Transaction Hash"
            value={hash}
            onChange={(e) => setHash(e.target.value)}
          />
        </div>
      )}

      <Button
        onClick={handleSubmit}
        className="mt-8 w-full font-medium"
        disabled={(side === 'sell' && !hash) || isLoading}
      >
        {isLoading ? <Spinner /> : 'I have paid!'}
      </Button>
    </div>
  );
};
