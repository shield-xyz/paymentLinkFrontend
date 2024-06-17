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

export const PaymentSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email' }),
  name: z
    .string()
    .min(3, { message: 'Name must be at least 3 characters long' }),
});

export const usePaymentLink = ({ paymentLinkData }) => {
  const { data: session } = useSession();

  const [tronWeb, setTronWeb] = useState(null);
  const [isLoadingConnection, setIsLoadingConnection] = useState(false);
  const [isLoadingPayment, setIsLoadingPayment] = useState(false);

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(PaymentSchema),
    mode: 'onChange',
  });
  const { handleSubmit } = form;

  const onSubmit = async (data) => {
    try {
      console.log({ data });
    } catch (error) {
      handleSubmissionError(error, 'Could save Personal information');
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
        setTronWeb(res);
        addWallet(paymentLinkData.id, res.address);
        toast.success('Connected to TronLink');
      }
      return res;
    } catch (error) {
      handleSubmissionError(error, 'Error connecting to TronLink');
    } finally {
      setIsLoadingConnection(false);
    }
  };

  const handlePayment = async () => {
    try {
      setIsLoadingPayment(true);
      const recipient = env.NEXT_PUBLIC_WALLET;
      const tokenID = env.NEXT_PUBLIC_TOKEN_USDT; // TODO: change by paymentLinkData.tokenAddress

      const amount = paymentLinkData.amount;

      console.log({ amount });

      console.log({ tokenID, recipient });

      if (!tronWeb || !tronWeb.ready) {
        toast.info('We need access to your wallet');
        const res = await connectToTron();

        try {
          await sendTRC20(
            res.tronWeb,
            tokenID,
            recipient,
            parseAmountToDecimals(amount, 6),
            paymentLinkData.id,
          );

          router.refresh();
        } catch (error) {
          console.error('Transaction failed:', error);
        }
      } else {
        try {
          addWallet(paymentLinkData.id, tronWeb.address);
          sendTRC20(
            tronWeb.tronWeb,
            tokenID,
            recipient,
            parseAmountToDecimals(amount, 6),
            paymentLinkData.id,
          );
          router.refresh();
        } catch (error) {
          toast.error('Transaction failed:', error);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingPayment(false);
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
    handlePayment,
    isLoadingConnection,
    isLoadingPayment,
  };
};
