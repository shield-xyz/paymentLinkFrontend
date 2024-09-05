'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { handleSubmissionError, parseAmountToDecimals } from '@/lib/utils';

import { useManualPayment } from './useManualPayment';
import { useMetaMask } from './useMetaMask';
import { useTronLink } from './useTronLink';
import { addWallet } from '../actions';

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
    paymentHash: z.string().optional(),
    isManualPayment: z.boolean().optional(),
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
    } else if (!data.paymentHash || data.paymentHash === '') {
      ctx.addIssue({
        path: ['paymentHash'],
        message: 'Payment hash is required',
      });
    }
  });

export const usePaymentLink = ({ paymentLinkData, userWallet }) => {
  const [isLoadingPayment, setIsLoadingPayment] = useState(false);
  const [isVerifyingPayment, setIsVerifyingPayment] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const transferError = searchParams.get('transferError') === 'true';
  const id = searchParams.get('id');

  console.log({ userWallet });

  const {
    address: tronAddress,
    connectToTron,
    isReady: isTronReady,
    isTronLinkLoading,
    tronWeb,
    handleTronLinkTransfer,
  } = useTronLink();

  const {
    account: metaMaskAccount,
    connectToMetaMask,
    handleMetaMaskTransfer,
    isMetaMaskConnected,
    isMetaMaskLoading,
  } = useMetaMask();

  const { handleManualTransfer } = useManualPayment();

  const isEthereum = paymentLinkData?.assetId.includes('ethereum');
  const isReady = isTronReady || isMetaMaskConnected;
  const isTron = paymentLinkData?.assetId == 'usdt-tron';

  const isManualPayment = !isEthereum && !isTron;
  const isLoadingConnection = isTronLinkLoading || isMetaMaskLoading;

  const form = useForm({
    resolver: zodResolver(PaymentSchema),
    mode: 'onTouch',
    defaultValues: {
      email: '',
      name: '',
      paymentHash: '',
      isManualPayment,
    },
  });
  const {
    handleSubmit,
    getValues,
    trigger,
    formState: { errors },
  } = form;
  const values = getValues();
  console.log({ errors });

  const onSubmit = async () => {
    try {
      setIsLoadingPayment(true);
      const data = values;

      const amount = paymentLinkData.amount;

      if (isTron) {
        await addWallet({
          id: paymentLinkData.id,
          wallet: tronAddress,
        });

        await handleTronLinkTransfer({
          amount: parseAmountToDecimals(amount, paymentLinkData.asset.decimals),
          assetId: paymentLinkData.assetId,
          contractAddress: paymentLinkData.asset.address,
          email: data.email,
          id: paymentLinkData.id,
          name: data.name,
          toAddress: userWallet.address,
          tronWeb: tronWeb,
        });
      } else if (isEthereum) {
        await addWallet({
          id: paymentLinkData.id,
          wallet: metaMaskAccount,
        });

        await handleMetaMaskTransfer({
          account: metaMaskAccount,
          amount: parseAmountToDecimals(amount, paymentLinkData.asset.decimals),
          assetId: paymentLinkData.assetId,
          email: data.email,
          id: paymentLinkData.id,
          name: data.name,
          toAddress: userWallet.address,
          tokenAddress: paymentLinkData.asset.address,
        });
      } else {
        throw new Error('Invalid asset');
      }
    } catch (error) {
      console.error({ error });
      router.push(pathname + '?' + `id=${id}&transferError=true`);
    } finally {
      router.refresh();
      setTimeout(() => {
        setIsLoadingPayment(false);
      }, 1000);
    }
  };

  const handleConnection = async () => {
    try {
      if (isEthereum) {
        await connectToMetaMask();
      } else if (isTron) {
        await connectToTron();
      }
    } catch (error) {
      handleSubmissionError(error, 'Error connecting wallet');
    }
  };

  const handleVerifyPayment = async () => {
    try {
      console.log('ey');
      setIsVerifyingPayment(true);
      const paymentHash = await trigger('paymentHash', {
        shouldFocus: true,
      });
      console.log({ paymentHash });
      await handleManualTransfer({
        assetId: paymentLinkData.assetId,
        email: values.email,
        id: paymentLinkData.id,
        name: values.name,
        paymentHash: values.paymentHash,
      });
    } catch (error) {
      console.error({ error });
    } finally {
      setIsVerifyingPayment(false);
    }
  };

  return {
    form,
    handleConnection,
    handleSubmit,
    handleVerifyPayment,
    isLoadingConnection,
    isLoadingPayment,
    isManualPayment,
    isVerifyingPayment,
    isReady,
    onSubmit,
    steps,
    transferError,
  };
};
