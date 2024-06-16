'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { createPaymentLink } from '../actions';

import { env } from '@/config';
import { handleSubmissionError } from '@/lib/utils';

export const CreatePaymentLinkSchema = z.object({
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

export const useCreatePaymentLink = () => {
  const [step, setStep] = useState(1);
  const { data: session } = useSession();
  const [link, setLink] = useState('');

  const form = useForm({
    resolver: zodResolver(CreatePaymentLinkSchema),
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
      const res = await createPaymentLink(data, session.accessToken);
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
