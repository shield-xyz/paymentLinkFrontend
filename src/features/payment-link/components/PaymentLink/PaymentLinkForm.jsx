'use client';

import { StepOne } from './StepOne';
import { StepThree } from './StepThree';
import { StepTwo } from './StepTwo';
import { usePaymentLink } from '../../hooks';

import { cn } from '@/lib/utils';

export const PaymentLinkForm = ({ paymentLinkData, userWallet }) => {
  const {
    form,
    handleConnection,
    handleSubmit,
    handleVerifyPayment,
    isLoadingConnection,
    isLoadingPayment,
    isManualPayment,
    isReady,
    isVerifyingPayment,
    onSubmit,
    transferError,
  } = usePaymentLink({
    paymentLinkData,
    userWallet,
  });

  return (
    <div
      className={cn(
        'mx-auto flex max-h-screen w-full flex-col gap-4 overflow-auto',
      )}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 overflow-auto"
      >
        <StepOne form={form} />
        <StepTwo
          form={form}
          isLoadingConnection={isLoadingConnection}
          isLoadingPayment={isLoadingPayment}
          isManualPayment={isManualPayment}
          isReady={isReady}
          isVerifyingPayment={isVerifyingPayment}
          onConnectWallet={handleConnection}
          onSubmit={onSubmit}
          userWallet={userWallet}
          handleVerifyPayment={handleVerifyPayment}
        />
        {transferError && (
          <StepThree
            form={form}
            handleVerifyPayment={handleVerifyPayment}
            isLoadingPayment={isLoadingPayment}
            isVerifyingPayment={isVerifyingPayment}
          />
        )}
      </form>
    </div>
  );
};
