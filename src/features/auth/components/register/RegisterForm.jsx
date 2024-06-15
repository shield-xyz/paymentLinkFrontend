'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import StepOne from './StepOne';
import Steps from './Steps';
import StepTwo from './StepTwo';
import { register } from '../..';

import { handleSubmissionError, handleSubmissionSuccess } from '@/lib/utils';

export const RegisterSchema = z
  .object({
    user_name: z
      .string()
      .min(3, {
        message: 'Name must be at least 3 characters long',
      })
      .max(60, {
        message: 'Name must be at most 60 characters long',
      }),
    email: z.string().email({ message: 'Please enter a valid email' }),
    password: z
      .string()
      .min(3, {
        message: 'Password must be at least 3 characters long',
      })
      .max(60, {
        message: 'Password must be at most 60 characters long',
      }),
    passwordConfirm: z
      .string()
      .min(3, {
        message: 'Password must be at least 3 characters long',
      })
      .max(60, {
        message: 'Password must be at most 60 characters long',
      }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'Passwords do not match',
    path: ['passwordConfirm'],
  });

const RegisterForm = () => {
  const [step, setStep] = useState(1);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(RegisterSchema),
    mode: 'onChange',
  });
  const { handleSubmit } = form;

  const onSubmit = async (data) => {
    try {
      await register(data);

      handleSubmissionSuccess('Registered successfully');
      await signIn('credentials', {
        ...data,
        redirect: false,
      });
      router.push('/dashboard');
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
      <form onSubmit={handleSubmit(onSubmit)} className="m-auto flex flex-col">
        {STEPS[step]}
      </form>
      <Steps step={step} />
    </div>
  );
};

export default RegisterForm;
