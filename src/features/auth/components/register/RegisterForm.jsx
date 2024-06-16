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
      .min(3, { message: 'Name must be at least 3 characters long' })
      .max(60, { message: 'Name must be at most 60 characters long' }),
    email: z.string().email({ message: 'Please enter a valid email' }),
    password: z
      .string()
      .min(3, { message: 'Password must be at least 3 characters long' })
      .max(60, { message: 'Password must be at most 60 characters long' }),
    passwordConfirm: z
      .string()
      .min(3, { message: 'Password must be at least 3 characters long' })
      .max(60, { message: 'Password must be at most 60 characters long' }),
    description: z
      .string()
      .min(10, { message: 'Description must be at least 10 characters long' })
      .optional(),
    logo: z
      .any()
      .refine(
        (file) => file[0]?.size <= MAX_FILE_SIZE,
        `Max image size is 5MB.`,
      )
      .refine(
        (file) => ACCEPTED_IMAGE_TYPES.includes(file[0]?.type),
        'Only .jpg, .jpeg, .png and .webp formats are supported.',
      ),
    company: z
      .string()
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
    mode: 'onChange',
  });
  const { handleSubmit } = form;

  const onSubmit = async (data) => {
    try {
      const { email, password, user_name, description, logo, company } = data;

      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);
      formData.append('user_name', user_name);
      formData.append('description', description);
      formData.append('logo', logo[0]);
      formData.append('company', company);

      await register(formData);

      const loginCredentials = {
        email,
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
