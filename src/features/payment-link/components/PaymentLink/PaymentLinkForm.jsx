'use client';

import { StepOne } from './StepOne';
import { StepTwo } from './StepTwo';
import { usePaymentLink } from '../../hooks';

export const PaymentLinkForm = ({ paymentLinkData }) => {
  const {
    form,
    onSubmit,
    handleSubmit,
    tronWeb,
    connectToTron,
    isLoadingConnection,
    isLoadingPayment,
  } = usePaymentLink({ paymentLinkData });

  return (
    <div className="mx-auto flex w-full flex-col gap-4 py-24 ">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <StepOne form={form} />
        <StepTwo
          tronWeb={tronWeb}
          connectToTron={connectToTron}
          isLoadingConnection={isLoadingConnection}
          isLoadingPayment={isLoadingPayment}
        />
      </form>
    </div>
  );
};
