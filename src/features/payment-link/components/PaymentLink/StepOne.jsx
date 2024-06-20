'use client';

import { ErrorMessage } from '@hookform/error-message';

import { StepIndicator } from '@/components';
import Container from '@/components/ui/container';
import { Input } from '@/components/ui/input';

export const StepOne = ({ form }) => {
  const {
    register,
    formState: { errors },
    setValue,
  } = form;

  return (
    <Container className="m-auto flex w-full max-w-[95vw] flex-col gap-2 rounded-lg border border-border p-5 sm:w-[450px]">
      <div className="mb-4 flex items-center gap-2 text-sm">
        <StepIndicator step={1} index={0} />
        <span>Personal information</span>
      </div>
      <Input
        type="text"
        placeholder="Full Name"
        autoFocus
        {...register('name')}
        onChange={(e) => {
          e.target.value = e.target.value.replace(/[^A-Za-z\s]/g, '');
          setValue('name', e.target.value, {
            shouldValidate: true,
            shouldDirty: true,
          });
        }}
      />
      <ErrorMessage
        errors={errors}
        name="name"
        render={({ message }) => (
          <span className="text-sm text-destructive">{message}</span>
        )}
      />
      <Input placeholder="Email Address" autoFocus {...register('email')} />
      <ErrorMessage
        errors={errors}
        name="email"
        render={({ message }) => (
          <span className="text-sm text-destructive">{message}</span>
        )}
      />
      <span className="text-xs text-muted-foreground">
        Get transaction updates and receipt notifications via email
      </span>
    </Container>
  );
};
