'use client';

import { StepOne } from './StepOne';
import { StepTwo } from './StepTwo';
import { usePaymentLink } from '../../hooks';

export const PaymentLinkForm = ({ paymentLinkData, userWallet }) => {
  const {
    form,
    handleConnection,
    handleSubmit,
    isLoadingConnection,
    isLoadingPayment,
    isReady,
    onSubmit,
  } = usePaymentLink({ paymentLinkData, userWallet });

  return (
    <div className="mx-auto flex w-full flex-col gap-4 py-24 ">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <StepOne form={form} />
        <StepTwo
          onConnectWallet={handleConnection}
          isLoadingConnection={isLoadingConnection}
          isLoadingPayment={isLoadingPayment}
          isReady={isReady}
        />
      </form>
    </div>
  );
};
