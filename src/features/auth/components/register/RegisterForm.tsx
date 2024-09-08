'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { handleSubmissionError, handleSubmissionSuccess } from '@/lib/utils';

import StepOne from './StepOne';
import Steps from './Steps';
import { register } from '../..';

const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];
const MAX_FILE_SIZE = 5000000;

export const RegisterSchema = z.object({
  user_name: z
    .string()
    .min(1, { message: 'Name is required' })
    .min(3, { message: 'Name must be at least 3 characters long' })
    .max(60, { message: 'Name must be at most 60 characters long' }),
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
  company: z.string().optional(),
  validationToken: z.string(),
});

const RegisterForm = ({ validationToken, login }) => {
  const [step, setStep] = useState(1);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(RegisterSchema),
    mode: 'onTouched',
    defaultValues: {
      validationToken,
    },
  });
  const { handleSubmit, watch } = form;

  watch();

  const onSubmit = async (data) => {
    try {
      const { user_name, description, logo, company } = data;

      const formData = new FormData();
      formData.append('user_name', user_name);
      formData.append('description', description);
      formData.append('logo', logo[0]);
      formData.append('company', company);
      formData.append('validation_token', validationToken);

      const res = await register(formData);

      if ('error' in res) {
        throw new Error(res.error);
      }

      handleSubmissionSuccess('Registered successfully');
      login(validationToken);
      router.push('/buy-sell');
    } catch (error) {
      handleSubmissionError(error, 'Could not register');
    }
  };

  const STEPS = {
    1: <StepOne form={form} setStep={setStep} />,
    // 2: <StepTwo form={form} />,
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
