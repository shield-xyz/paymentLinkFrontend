'use client';

import { StepOne } from './StepOne';
import { Steps } from './Steps';
import { StepTwo } from './StepTwo';
import { useCreatePaymentLink } from '../../hooks';

export const CreatePaymentLinkForm = () => {
  const { form, step, steps, onSubmit, link, handleSubmit } =
    useCreatePaymentLink();

  const STEPS = {
    1: <StepOne form={form} />,
    2: <StepTwo link={link} />,
  };

  return (
    <div className="flex min-h-screen w-screen flex-col">
      <Steps step={step} steps={steps} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto flex flex-col py-24"
      >
        {STEPS[step]}
      </form>
    </div>
  );
};