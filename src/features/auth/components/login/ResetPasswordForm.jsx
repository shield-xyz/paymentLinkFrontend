'use client';

import { ErrorMessage } from '@hookform/error-message';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Icons } from '@/components';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { handleSubmissionError, handleSubmissionSuccess } from '@/lib/utils';

import { resetPassword } from '../../actions';

export const ResetSchema = z
  .object({
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
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'Passwords do not match',
    path: ['passwordConfirm'],
  });

const ResetPasswordForm = ({ resetToken }) => {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(ResetSchema),
    mode: 'onChange',
  });
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
    getValues,
  } = form;

  const { password } = getValues();

  const onSubmit = async (data) => {
    try {
      const res = await resetPassword({
        password: data.password,
        resetToken,
      });

      if (res?.error) {
        throw new Error(res.error);
      }

      handleSubmissionSuccess('Password reset successfully');
      router.push('/login');
    } catch (error) {
      handleSubmissionError(error, 'Error resetting password');
    }
  };

  return (
    <div className="flex min-h-screen w-screen flex-col">
      <form onSubmit={handleSubmit(onSubmit)} className="m-auto flex flex-col">
        <div className="m-auto flex w-96 max-w-[95vw] flex-col gap-2 rounded-lg border border-border p-4">
          <div className="mb-5 flex flex-col items-center">
            <div className="rounded-lg bg-black/5 p-1">
              <Icons.logo className="scale-75" />
            </div>
            <span className="mb-2 mt-5 text-2xl font-bold">
              Password Recovery
            </span>
          </div>
          <Input
            autoComplete="new-password"
            placeholder="New password"
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
            Reset Password
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
