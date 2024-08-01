'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { createPaymentLink } from '../actions';
import { getFinalPaymentLink } from '../utils';

import { knownErrors, knownErrorsMessages } from '@/lib/knownErrors';
import { handleSubmissionError } from '@/lib/utils';

export const CreatePaymentLinkSchema = z.object({
  id: z.nullable(),
  name: z
    .string()
    .min(3, { message: 'Name must be at least 3 characters long' }),
  description: z.string().optional(),
  amount: z.coerce.number({
    message: 'Amount is required',
  }),
  token: z
    .string({ message: 'Currency is required' })
    .min(3, { message: 'Currency must be at least 3 characters long' }),
  assetId: z.string(),
});

export const useCreatePaymentLink = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [link, setLink] = useState('');

  const form = useForm({
    resolver: zodResolver(CreatePaymentLinkSchema),
    mode: 'onChange',
    defaultValues: {
      token: null,
      id: null,
    },
  });
  const { handleSubmit } = form;

  const onSubmit = async (data) => {
    try {
      const res = await createPaymentLink(data, session?.accessToken);

      if (res.error) {
        throw new Error(res.error);
      }

      const finalLink = getFinalPaymentLink(res.id);
      setLink(finalLink);
      toast.success('Payment link created successfully');
      setStep(2);
    } catch (error) {
      if (error.message === knownErrors['unverified user']) {
        toast(knownErrorsMessages['unverified user'], {
          action: {
            label: 'Verify',
            onClick: () => router.push('/settings/verification'),
          },
          duration: 20000,
        });
      } else {
        handleSubmissionError(error, 'Could not register');
      }
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
