'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useManualPayment } from './useManualPayment';
import { useMetaMask } from './useMetaMask';
import { useTronLink } from './useTronLink';
import { addWallet } from '../actions';

import { handleSubmissionError, parseAmountToDecimals } from '@/lib/utils';
import posthog from 'posthog-js';

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

        // TODO: Try getting the transaction fee here by maybe logging the result of the tx
        // Logger Transaction Success

        posthog.capture('transaction_processed', {
          payment_link_data_id: paymentLinkData.id,
          properties: {
            amount: amount,
            // fee: transactionFee
          }
        })

        // TODO: Figure out the currency

        client.capture('payment_transaction', {
          payment_link_data_id: paymentLinkData.id,
          amount: amount,
          // currency: currency,
          timestamp: new Date().toISOString()
        })
      } else {
        throw new Error('Invalid asset');
      }
    } catch (error) {
      console.error('Transaction failed:', error);
      handleSubmissionError(error, 'Transaction failed');
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
      handleSubmissionError(error, 'Error verifying payment');
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
  };
};
