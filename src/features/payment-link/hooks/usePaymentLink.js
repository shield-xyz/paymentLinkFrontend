'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { fetchLinks } from '../actions'; // Import the fetchLinks function

import { handleSubmissionError } from '@/lib/utils';

// TODO: re-structure schema and defaultValues
export const PaymentSchema = z.object({
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
  const { data: session } = useSession();

  console.log({ session });

  const form = useForm({
    resolver: zodResolver(PaymentSchema),
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
    } catch (error) {
      handleSubmissionError(error, 'Could not register');
    }
  };

  const fetchPaymentLinks = async () => {
    if (session?.accessToken) {
      const data = await fetchLinks(session.accessToken);
      return data;
    }
    return [];
  };

  const steps = [
    {
      title: 'Personal information',
      description: '',
    },
    {
      title: 'Payment method',
      description: '',
    },
  ];

  return {
    steps,
    form,
    onSubmit,
    handleSubmit,
    fetchPaymentLinks, // Export the fetchPaymentLinks function
  };
};
