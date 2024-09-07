'use client';

import { ErrorMessage } from '@hookform/error-message';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Icons } from '@/components';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { handleSubmissionError, handleSubmissionSuccess } from '@/lib/utils';

import { postForgotPassword } from '../../actions';

export const ForgotPasswordSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email' }),
});

const ForgotPasswordForm = () => {
  const form = useForm({
    resolver: zodResolver(ForgotPasswordSchema),
    mode: 'onChange',
  });
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
  } = form;

  const onSubmit = async (data) => {
    try {
      const res = await postForgotPassword({ email: data.email });

      if ('error' in res) {
        throw new Error(res.error);
      }

      handleSubmissionSuccess('Recovery email sent successfully');
    } catch (error) {
      handleSubmissionError(error, 'Could sent recovery email');
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
            <span className="mb-2 mt-5 text-2xl font-bold">Get started</span>
          </div>
          <Input
            autoComplete="username"
            autoFocus
            placeholder="Enter your email address"
            {...register('email')}
          />
          <ErrorMessage
            errors={errors}
            name="email"
            render={({ message }) => (
              <span className="text-sm text-destructive">{message}</span>
            )}
          />

          <Button
            type="submit"
            variant="default"
            className="mt-2 py-3 text-sm font-medium tracking-wider"
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            Send Recovery Email
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
