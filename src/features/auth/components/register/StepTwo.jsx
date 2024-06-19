'use client';

import { ErrorMessage } from '@hookform/error-message';

import { Icons } from '@/components';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const StepTwo = ({ form }) => {
  const {
    register,
    formState: { errors, isSubmitting },
    getValues,
  } = form;
  const { password } = getValues();

  return (
    <div className="m-auto flex w-96 max-w-[95vw] flex-col gap-2 rounded-lg border border-border p-4">
      <div className="mb-5 flex flex-col items-center">
        <div className="rounded-lg bg-black/5 p-1">
          <Icons.logo className="scale-75" />
        </div>
        <span className="mb-2 mt-5 text-2xl font-bold">Choose a password</span>
      </div>
      <Input
        autoComplete="new-password"
        placeholder="Choose a password"
        type="password"
        {...register('password')}
      />
      <ErrorMessage
        errors={errors}
        name="password"
        render={({ message }) => (
          <span className="text-sm text-destructive">{message}</span>
        )}
      />
      <Input
        autoComplete="new-password"
        placeholder="Confirm password"
        type="password"
        {...register('passwordConfirm', {
          validate: (value) =>
            value === password || 'The passwords do not match',
        })}
      />
      <ErrorMessage
        errors={errors}
        name="passwordConfirm"
        render={({ message }) => (
          <span className="text-sm text-destructive">{message}</span>
        )}
      />
      <Button
        className="mt-2 py-3 text-sm font-medium tracking-wider"
        isLoading={isSubmitting}
        type="submit"
        variant="default"
        disabled={isSubmitting}
      >
        Get started
      </Button>
    </div>
  );
};

export default StepTwo;
