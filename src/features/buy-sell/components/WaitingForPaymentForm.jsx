'use client';

import copy from 'copy-to-clipboard';
import { useSession } from 'next-auth/react';
import QRCode from 'qrcode.react';
import { useState } from 'react';
import { toast } from 'sonner';

import { Icons } from '@/components';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Spinner from '@/components/ui/spinner';
import { formatCryptoHash } from '@/lib/utils';

import { submitRampOrder } from '../actions';
import { useStore } from '../store';

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
          if (data.msg === 'unverified user') {
            return toast.warning('Must verify your account to continue');
          }
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
              <b>Beneficiary Name:</b> Bridge Ventures Inc
            </span>
            <span>
              <b>Account Number:</b> 218624789911
            </span>
            <span>
              <b>Beneficiary Address:</b> 21750 Hardy Oak Blvd, Ste 104 PMB
              77950, San Antonio, TX 78258-4946
            </span>
            <span>
              <b>Routing Number:</b> 101019644
            </span>
            <span>
              <b>Bank Name:</b> Lead Bank
            </span>
            <span>
              <b>Bank Address:</b> 1801 Main St, Kansas City, MO 64108
            </span>
          </div>
        </div>
      ) : (
        <div>
          <div className="text-black/30">Scan/Send Deposit</div>
          <div className="flex items-center justify-center p-4 sm:p-8">
            <QRCode
              className="hidden sm:block"
              value={selectedNetwork.deposit_address}
              size={200}
            />
            <QRCode
              className="block sm:hidden"
              value={selectedNetwork.deposit_address}
              size={180}
            />
          </div>
          <div className="mt-4 flex justify-between gap-4 sm:gap-8">
            <div className="text-black/60">Address</div>
            <div className="flex gap-2 sm:gap-4">
              <div className="hidden sm:block">
                {selectedNetwork.deposit_address}
              </div>
              <div className="block sm:hidden">
                {formatCryptoHash(selectedNetwork.deposit_address)}
              </div>

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
