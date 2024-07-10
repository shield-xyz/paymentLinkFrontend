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

const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];
const MAX_FILE_SIZE = 5000000;

export const RegisterSchema = z
  .object({
    user_name: z
      .string()
      .min(1, { message: 'Name is required' })
      .min(3, { message: 'Name must be at least 3 characters long' })
      .max(60, { message: 'Name must be at most 60 characters long' }),
    email: z
      .string()
      .min(1, { message: 'Email is required' })
      .email({ message: 'Please enter a valid email' }),
    password: z
      .string()
      .min(8, {
        message: 'Password must be at least 8 characters long',
      })
      .max(60, {
        message: 'Password must be at most 60 characters long',
      })
      .regex(/[A-Z]/, {
        message: 'Password must contain at least 1 uppercase character',
      }),
    passwordConfirm: z.string(),
    description: z
      .string()
      .min(10, { message: 'Description must be at least 10 characters long' })
      .optional(),
    logo: z
      .any()
      .optional() // Keep it optional
      .refine(
        (file) =>
          !file || file[0] === undefined || file[0]?.size <= MAX_FILE_SIZE,
        `Max image size is 5MB.`,
      )
      .refine(
        (file) =>
          !file ||
          file[0] === undefined ||
          ACCEPTED_IMAGE_TYPES.includes(file[0]?.type),
        'Only .jpg, .jpeg, .png, and .webp formats are supported.',
      ),
    company: z
      .string({
        message: 'Company name is required',
      })
      .min(1, { message: 'Company name is required' })
      .min(3, { message: 'Company name must be at least 3 characters long' })
      .optional(),
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
    mode: 'onTouched',
  });
  const { handleSubmit } = form;

  const onSubmit = async (data) => {
    try {
      const { email, password, user_name, description, logo, company } = data;

      const formData = new FormData();
      formData.append('email', email.toLowerCase());
      formData.append('password', password);
      formData.append('user_name', user_name);
      formData.append('description', description);
      formData.append('logo', logo[0]);
      formData.append('company', company);

      const res = await register(formData);

      if (res.error) {
        throw new Error(res.error);
      }

      const loginCredentials = {
        email: email.toLowerCase(),
        password,
      };

      handleSubmissionSuccess('Registered successfully');
      await signIn('credentials', {
        ...loginCredentials,
        redirect: false,
      });
      router.push('/payment-links');
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
      <Steps step={step} setStep={setStep} />
    </div>
  );
};

export default RegisterForm;
