'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { addWallet, fetchLinks } from '../actions';
import { connectToTronLink, sendTRC20 } from '../services';

import { env } from '@/config';
import { handleSubmissionError, parseAmountToDecimals } from '@/lib/utils';

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

export const PaymentSchema = z
  .object({
    email: z
      .string()
      .optional()
      .refine(
        (val) => val === '' || z.string().email().safeParse(val).success,
        {
          message: 'Please enter a valid email',
        },
      ),
    name: z
      .string()
      .optional()
      .refine((val) => val === '' || z.string().min(3).safeParse(val).success, {
        message: 'Name must be at least 3 characters long',
      }),
  })
  .superRefine((data, ctx) => {
    const hasEmail = data.email !== undefined && data.email !== '';
    const hasName = data.name !== undefined && data.name !== '';
    if (hasEmail && !hasName) {
      ctx.addIssue({
        path: ['name'],
        message: 'Name is required',
      });
    } else if (hasName && !hasEmail) {
      ctx.addIssue({
        path: ['email'],
        message: 'Email is required',
      });
    }
  });

export const usePaymentLink = ({ paymentLinkData }) => {
  const { data: session } = useSession();

  const [tronWeb, setTronWeb] = useState(null);
  const [tronAddress, setTronAddress] = useState(null);
  const [isTronReady, setIsTronReady] = useState(false);
  const [isLoadingConnection, setIsLoadingConnection] = useState(false);
  const [isLoadingPayment, setIsLoadingPayment] = useState(false);

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(PaymentSchema),
    mode: 'onChange',
  });
  const { handleSubmit, getValues } = form;

  console.log(getValues());

  const onSubmit = async (data) => {
    try {
      setIsLoadingPayment(true);
      const recipient = env.NEXT_PUBLIC_WALLET;
      const tokenID = env.NEXT_PUBLIC_TOKEN_USDT; // TODO: change by paymentLinkData.tokenAddress

      const amount = paymentLinkData.amount;

      let address = tronAddress;
      let isReady = isTronReady;
      let tronWebInstance = tronWeb;

      if (!tronWebInstance || !isReady) {
        const res = await connectToTron();
        address = res.address;
        tronWebInstance = res.tronWeb;
        isReady = res.tronWeb.ready;
      }

      await addWallet({
        id: paymentLinkData.id,
        wallet: address,
      });

      await sendTRC20({
        tronWeb: tronWebInstance,
        contractAddress: tokenID,
        toAddress: recipient,
        amount: parseAmountToDecimals(amount, 6),
        id: paymentLinkData.id,
        email: data.email,
        name: data.name,
      });

      router.refresh();
    } catch (error) {
      console.error('Transaction failed:', error);
      toast.error('Transaction failed:', error);
    } finally {
      setIsLoadingPayment(false);
    }
  };

  const fetchPaymentLinks = async () => {
    if (session?.accessToken) {
      const data = await fetchLinks(session.accessToken);
      return data;
    }
    return [];
  };

  const connectToTron = async () => {
    try {
      setIsLoadingConnection(true);
      const res = await connectToTronLink();
      console.log({ res });
      if (res?.tronWeb) {
        setTronWeb(res.tronWeb);
        setTronAddress(res.address);
        setIsTronReady(res.tronWeb.ready);
        toast.success('Connected to TronLink');
        return res;
      } else {
        throw new Error('Error connecting to TronLink');
      }
    } catch (error) {
      handleSubmissionError(error, 'Error connecting to TronLink');
    } finally {
      setIsLoadingConnection(false);
    }
  };

  return {
    steps,
    form,
    onSubmit,
    handleSubmit,
    fetchPaymentLinks,
    connectToTron,
    tronWeb,
    isLoadingConnection,
    isLoadingPayment,
  };
};
