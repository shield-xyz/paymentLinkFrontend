'use client';

import { ErrorMessage } from '@hookform/error-message';
import QRCode from 'qrcode.react';

import { Icons, StepIndicator } from '@/components';
import { Button } from '@/components/ui/button';
import Container from '@/components/ui/container';
import { Input } from '@/components/ui/input';
import { formatCryptoHash } from '@/lib/utils';

import { copyCode } from '../../utils';

export const StepTwo = ({
  onConnectWallet,
  isLoadingConnection,
  isLoadingPayment,
  isReady,
  isManualPayment,
  form,
  userWallet,
  onSubmit,
  isVerifyingPayment,
  handleVerifyPayment,
}) => {
  const {
    register,
    formState: { errors },
  } = form;

  const { address } = userWallet || {};

  return (
    <div className="flex flex-col items-center">
      <Container className="m-auto flex w-full max-w-[95vw] flex-col gap-2 rounded-lg border border-border p-5 sm:w-[450px]">
        {isManualPayment ? (
          <div>
            <div className="mb-4 flex flex-col items-center gap-2">
              <span className="tracking-tight">
                Please make the transfer to
              </span>
              <div
                className="group mt-4 flex h-12 w-full items-center rounded-md border bg-background px-4"
                onClick={() => copyCode(address, 'Link copied to clipboard')}
                title={address}
              >
                <span className="line-clamp-1 w-full cursor-pointer overflow-hidden text-ellipsis break-all text-blue-400">
                  {formatCryptoHash(address)}
                </span>
                <Icons.copy className="h-10 w-10 cursor-pointer rounded-md p-2 hover:bg-muted" />
              </div>
              <div className="flex w-auto">
                <QRCode value={address} size={200} includeMargin />
              </div>
            </div>
            <span className="mx-auto mb-2 flex justify-center text-sm tracking-tight sm:text-base">
              Once transfer is completed, verify payment:
            </span>
            <Input
              type="text"
              placeholder="Enter Your Payment Hash"
              {...register('paymentHash')}
            />
            <ErrorMessage
              errors={errors}
              name="paymentHash"
              render={({ message }) => (
                <span className="text-sm text-destructive">{message}</span>
              )}
            />
            <Button
              className="mt-4 w-full"
              type="button"
              size="lg"
              disabled={isLoadingPayment || isVerifyingPayment}
              onClick={handleVerifyPayment}
            >
              {isLoadingPayment ? (
                <Icons.loaderCircle className="ml-2 h-6 w-6 animate-spin" />
              ) : (
                <span>Verify Payment</span>
              )}
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-2 text-sm">
            <div className="mb-4 flex items-center gap-2">
              <StepIndicator step={2} index={1} />
              <span>Payment Method</span>
            </div>
            <Button
              className="flex justify-between rounded-lg px-5 py-7 text-base font-semibold text-primary"
              disabled={isReady || isLoadingConnection || isLoadingPayment}
              onClick={onConnectWallet}
              size="sm"
              type="button"
              variant="outline"
            >
              Connect Wallet
              {isLoadingConnection ? (
                <Icons.loaderCircle className="ml-2 h-6 w-6 animate-spin" />
              ) : (
                <Icons.wallet className="ml-2 h-6 w-6" />
              )}
            </Button>
            <Button
              className="flex justify-between rounded-lg px-5 py-7 text-base font-semibold text-primary"
              disabled={!isReady || isLoadingPayment}
              size="sm"
              type="button"
              variant="outline"
              onClick={onSubmit}
            >
              Wallet Transfer
              {isLoadingPayment ? (
                <Icons.loaderCircle className="ml-2 h-6 w-6 animate-spin" />
              ) : (
                <Icons.send className="ml-2 h-6 w-6" />
              )}
            </Button>
          </div>
        )}
      </Container>
      <div className="mx-auto mt-2 flex items-center gap-2">
        <Icons.lock className="h-3.5 w-3.5 " />
        <span className="text-xs text-muted-foreground">
          Secure and encrypted payment
        </span>
      </div>
    </div>
  );
};
