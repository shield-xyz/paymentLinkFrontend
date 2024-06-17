'use client';

import { ErrorMessage } from '@hookform/error-message';
import Link from 'next/link';

import { Icons } from '@/components';
import { Button } from '@/components/ui/button';
import Container from '@/components/ui/container';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { COINS } from '@/config';
import { cn } from '@/lib/utils';

export const StepOne = ({ form }) => {
  const {
    register,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = form;

  const { getValues } = form;
  const values = getValues();

  const { token } = values;

  watch('token');

  const handleSelectToken = (token) => {
    setValue('token', token);
  };

  return (
    <Container className="m-auto flex w-96 max-w-[95vw] flex-col gap-2 rounded-lg border border-border p-4 sm:w-[450px]">
      <h1 className="mb-4 font-bold">Create payment link</h1>
      <Input
        placeholder="Product name"
        label="Product name"
        autoFocus
        {...register('name')}
      />
      <ErrorMessage
        errors={errors}
        name="name"
        render={({ message }) => (
          <span className="text-sm text-destructive">{message}</span>
        )}
      />
      <Textarea
        label="Description (optional)"
        placeholder="Tell us about the product"
        {...register('description')}
      />
      <ErrorMessage
        errors={errors}
        name="description"
        render={({ message }) => (
          <span className="text-sm text-destructive">{message}</span>
        )}
      />

      <div className="relative">
        <Input
          placeholder="0.00"
          type="number"
          label="Price"
          step="0.01"
          {...register('amount')}
        />
        <span className="absolute bottom-[11px] right-10 text-xs font-semibold">
          USD
        </span>
      </div>
      <ErrorMessage
        errors={errors}
        name="amount"
        render={({ message }) => (
          <span className="text-sm text-destructive">{message}</span>
        )}
      />

      <Container className="rounded-md p-2">
        <span className="flex w-full border-b pb-2 text-sm text-muted-foreground">
          Settlement networks & currencies
        </span>
        <div className="flex w-full flex-col gap-2 py-2">
          {COINS.map((coin) => {
            const Icon = Icons[coin.icon];
            return (
              <div
                key={coin.name}
                className={cn(
                  'flex cursor-pointer items-center gap-2 rounded-md px-2 py-1',
                  {
                    'bg-gray-100': token === coin.name,
                  },
                )}
                onClick={() => handleSelectToken(coin.name)}
              >
                <Icon className={cn('', {})} />
                <span className="text-sm">{coin.name}</span>
              </div>
            );
          })}
        </div>
        <span className="text-xxs leading-[0.1rem]">
          You can update your accepted networks and currencies in{' '}
          <Link
            href="/settings"
            className="text-primary underline"
            tabIndex="-1"
          >
            account settings
          </Link>
        </span>
      </Container>

      <Button
        type="submit"
        variant="default"
        className="mt-2 py-3 text-sm font-medium tracking-wider"
        isLoading={isSubmitting}
        isDisabled={isSubmitting}
      >
        Continue
      </Button>
    </Container>
  );
};