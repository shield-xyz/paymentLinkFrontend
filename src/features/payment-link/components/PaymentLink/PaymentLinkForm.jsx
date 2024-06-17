'use client';

import { StepOne } from './StepOne';
import { StepTwo } from './StepTwo';
import { usePaymentLink } from '../../hooks';

export const PaymentLinkForm = () => {
  const { form, onSubmit, handleSubmit } = usePaymentLink();

  return (
    <div className="flex w-full flex-col">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto flex w-full flex-col gap-4 py-24"
      >
        <StepOne form={form} />
        <StepTwo />
      </form>
    </div>
  );
};
