'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { createLink } from '../actions/createLink';

import { env } from '@/config';
import { handleSubmissionError } from '@/lib/utils';

export const RegisterSchema = z.object({
  id: z.nullable(),
  name: z
    .string()
    .min(3, { message: 'Name must be at least 3 characters long' }),
  description: z.string().optional(),
  amount: z.coerce.number().min(1, { message: 'Amount must be at least 1' }),
  token: z
    .string()
    .min(3, { message: 'Token must be at least 3 characters long' }),
});

export const usePaymentLink = () => {
  const [step, setStep] = useState(1);
  const { data: session } = useSession();
  const [link, setLink] = useState(
    'https://pay.getshield.xyz/paylink?id=b950293f1d678e293fd2202af413efaf4c7bbd7f475916ee5dd502734f867e04',
  );

  const form = useForm({
    resolver: zodResolver(RegisterSchema),
    mode: 'onChange',
    defaultValues: {
      token: 'USDT',
      id: null,
    },
  });
  const { handleSubmit } = form;

  const onSubmit = async (data) => {
    try {
      console.log({ data });
      const res = await createLink(data, session.accessToken);
      const realLink = `${env.NEXT_PUBLIC_APP_URL}/paylink?id=${res.id}`;
      setLink(realLink);
      toast.success('Payment link created successfully');
      setStep(2);
    } catch (error) {
      handleSubmissionError(error, 'Could not register');
    }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const steps = [
    {
      title: 'Details',
      description: 'Fill in the details below to create a payment link.',
    },
    {
      title: 'Completed',
      description: 'The payment link has been created successfully.',
    },
  ];

  return {
    step,
    steps,
    nextStep,
    prevStep,
    form,
    onSubmit,
    link,
    handleSubmit,
  };
};
