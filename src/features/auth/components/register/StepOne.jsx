'use client';

import { ErrorMessage } from '@hookform/error-message';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { Icons } from '@/components';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const StepOne = ({ form, setStep }) => {
  const {
    register,
    formState: { errors },
    trigger,
    watch,
  } = form;

  const { getValues } = form;
  const { user_name, email } = getValues();

  const handleContinue = async () => {
    trigger(['user_name', 'email', 'company', 'logo']);
    if (
      user_name &&
      email &&
      !errors.user_name &&
      !errors.email &&
      !errors.company &&
      !errors.logo
    ) {
      setStep(2);
    }
  };

  const [fileUrl, setFileUrl] = useState(null);

  useEffect(() => {
    if (watch('logo')) {
      const file = watch('logo')[0];
      if (file instanceof File) {
        const fileUrl = URL.createObjectURL(file);
        setFileUrl(fileUrl);
      }
    }
  }, [watch]);

  return (
    <div className="m-auto flex w-96 max-w-[95vw] flex-col gap-2 rounded-lg border border-border p-4">
      <div className="mb-5 flex flex-col items-center">
        <div className="rounded-lg bg-black/5 p-1">
          <Icons.logo className="scale-75" />
        </div>
        <span className="mb-2 mt-5 text-2xl font-bold">Get started</span>
        <span className="text-sm text-muted-foreground">
          Sign up in less than 2 minutes
        </span>
      </div>
      <Input
        placeholder="Enter your name"
        autoFocus
        {...register('user_name')}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            handleContinue();
          }
        }}
      />
      <ErrorMessage
        errors={errors}
        name="user_name"
        render={({ message }) => (
          <span className="text-sm text-destructive">{message}</span>
        )}
      />
      <Input
        placeholder="Enter your email address"
        {...register('email')}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            handleContinue();
          }
        }}
      />
      <ErrorMessage
        errors={errors}
        name="email"
        render={({ message }) => (
          <span className="text-sm text-destructive">{message}</span>
        )}
      />

      <Input
        type="file"
        labelClassName="mt-2"
        placeholder="Upload your company logo"
        label="Upload your company logo (optional)"
        title="Upload your company logo"
        {...register('logo')}
      />
      {fileUrl && (
        <Image
          src={fileUrl}
          alt="logo"
          width={100}
          height={100}
          className="mx-auto h-32 w-32 rounded-md object-cover"
        />
      )}
      <ErrorMessage
        errors={errors}
        name="logo"
        render={({ message }) => (
          <span className="text-sm text-destructive">{message}</span>
        )}
      />
      <Input
        placeholder="Enter your company name"
        {...register('company')}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            handleContinue();
          }
        }}
      />
      <ErrorMessage
        errors={errors}
        name="company"
        render={({ message }) => (
          <span className="text-sm text-destructive">{message}</span>
        )}
      />

      <Button
        type="button"
        variant="default"
        className="mt-2 py-3 text-sm font-medium tracking-wider"
        onClick={handleContinue}
      >
        Continue
      </Button>
    </div>
  );
};

export default StepOne;
