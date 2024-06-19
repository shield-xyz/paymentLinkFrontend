'use client';

import { ErrorMessage } from '@hookform/error-message';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Icons } from '@/components';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { handleSubmissionError, handleSubmissionSuccess } from '@/lib/utils';

export const LoginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email' }),
  password: z
    .string()
    .min(3, {
      message: 'Password must be at least 3 characters long',
    })
    .max(60, {
      message: 'Password must be at most 60 characters long',
    }),
});

const LoginForm = () => {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(LoginSchema),
    mode: 'onChange',
  });
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
  } = form;

  const onSubmit = async (data) => {
    try {
      const result = await signIn('credentials', {
        ...data,
        redirect: false,
      });

      if (result?.error) {
        throw new Error('Invalid credentials');
      }

      handleSubmissionSuccess('Logged in successfully');
      router.push('/payment-links');
    } catch (error) {
      handleSubmissionError(error, 'Could not login');
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
          <Input
            autoComplete="current-password"
            placeholder="Enter your password"
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
          <Button
            type="submit"
            variant="default"
            className="mt-2 py-3 text-sm font-medium tracking-wider"
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            Login
          </Button>
          <span className="my-2 text-left text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link
              className="text-blue-400 duration-300 hover:text-blue-500"
              href="/register"
            >
              Sign up
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
