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
    handlePayment,
    isLoadingConnection,
    isLoadingPayment,
  } = usePaymentLink({ paymentLinkData });

  return (
    <div className="mx-auto flex  w-full flex-col gap-4 py-24 ">
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <StepOne form={form} />
      </form>
      <StepTwo
        tronWeb={tronWeb}
        connectToTron={connectToTron}
        handlePayment={handlePayment}
        isLoadingConnection={isLoadingConnection}
        isLoadingPayment={isLoadingPayment}
      />
    </div>
  );
};
