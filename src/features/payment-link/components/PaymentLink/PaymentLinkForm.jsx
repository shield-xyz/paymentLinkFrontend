'use client';

import { StepOne } from './StepOne';
import { StepTwo } from './StepTwo';
import { usePaymentLink } from '../../hooks';

import { cn } from '@/lib/utils';

export const PaymentLinkForm = ({ paymentLinkData, userWallet }) => {
  const {
    form,
    handleConnection,
    handleSubmit,
    isLoadingConnection,
    isLoadingPayment,
    isReady,
    onSubmit,
    isManualPayment,
  } = usePaymentLink({ paymentLinkData, userWallet });

  return (
    <div
      className={cn('mx-auto flex w-full flex-col gap-4', {
        'py-10': isManualPayment,
        'py-24': !isManualPayment,
      })}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <StepOne form={form} />
        <StepTwo
          form={form}
          isLoadingConnection={isLoadingConnection}
          isLoadingPayment={isLoadingPayment}
          isManualPayment={isManualPayment}
          isReady={isReady}
          onConnectWallet={handleConnection}
          userWallet={userWallet}
        />
      </form>
    </div>
  );
};
