'use client';

import { ErrorMessage } from '@hookform/error-message';

import { StepIndicator } from '@/components';
import { Button } from '@/components/ui/button';
import Container from '@/components/ui/container';
import { Input } from '@/components/ui/input';

export const StepOne = ({ form }) => {
  const {
    register,
    formState: { errors, isSubmitting },
  } = form;

  return (
    <Container className="m-auto flex w-full max-w-[95vw] flex-col gap-2 rounded-lg border border-border p-5 sm:w-[450px]">
      <div className="flex items-center gap-2 text-sm">
        <StepIndicator step={1} index={0} />
        <span>Personal information</span>
        <Button variant="ghost" className="ml-auto font-semibold text-primary">
          Generate
        </Button>
      </div>
      <Input placeholder="Full Name" autoFocus {...register('name')} />
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
      <Button
        type="submit"
        variant="default"
        className="mt-3 rounded-lg py-7 text-base font-medium tracking-wider"
        isLoading={isSubmitting}
        disabled={isSubmitting}
      >
        Continue
      </Button>
    </Container>
  );
};
