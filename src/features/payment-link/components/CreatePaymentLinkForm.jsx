'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { StepOne } from './StepOne';
import { Steps } from './Steps';
import { StepTwo } from './StepTwo';

import { handleSubmissionError } from '@/lib/utils';

// token: currency, amount, id, name, description

export const RegisterSchema = z.object({
  id: z.string().min(3, { message: 'Id must be at least 3 characters long' }),
  name: z
    .string()
    .min(3, { message: 'Name must be at least 3 characters long' }),
  description: z.string().optional(),
  amount: z.coerce.number().min(1, { message: 'Amount must be at least 1' }),
  currency: z
    .string()
    .min(1, { message: 'Currency must be at least 3 characters long' }),
  token: z
    .string()
    .min(3, { message: 'Token must be at least 3 characters long' }),
});

export const CreatePaymentLinkForm = () => {
  const [step, setStep] = useState(1);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(RegisterSchema),
    mode: 'onChange',
    defaultValues: {
      currency: 'USD',
      token: 'USDT',
    },
  });
  const { handleSubmit } = form;

  const onSubmit = async (data) => {
    try {
      console.log({ data });
      toast.success('Payment link created successfully');
      router.refresh();
    } catch (error) {
      handleSubmissionError(error, 'Could not register');
    }
  };

  const STEPS = {
    1: <StepOne form={form} setStep={setStep} />,
    2: <StepTwo form={form} />,
  };

  return (
    <div className="flex min-h-screen w-screen flex-col">
      <Steps step={step} setStep={setStep} />
      <form onSubmit={handleSubmit(onSubmit)} className="m-auto flex flex-col">
        {STEPS[step]}
      </form>
    </div>
  );
};
