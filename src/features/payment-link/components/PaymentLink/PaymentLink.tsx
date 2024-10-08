'use client';

import Image from 'next/image';
import Link from 'next/link';

import { LogoIcon } from '@/assets';
import { cn, formatAmount, getLogoUrl } from '@/lib/utils';

import { PaymentLinkForm } from './PaymentLinkForm';

export const PaymentLink = ({ paymentLinkData, userWallet }) => {
  const { user, amount, token, name, description, status, asset } =
    paymentLinkData || {};
  const { logo, company } = user || {};

  const isPaid = status === 'paid';

  const logoImage = getLogoUrl(logo);

  const formattedAmount = formatAmount(amount, asset.decimals);

  return (
    <div className="flex min-h-screen flex-col bg-background p-5 lg:flex-row">
      <div className="flex h-auto flex-col bg-muted px-4 py-6 sm:basis-1/2 sm:px-20">
        <div className="mb-10 flex items-center gap-4">
          <Image
            src={logoImage}
            alt="logo"
            width={100}
            height={100}
            className="h-14 w-14 overflow-auto rounded-md object-cover"
          />
          <h1>{company}</h1>
        </div>
        <div className="mb-10 border-b pb-5">
          <span className="min-w-fit text-5xl font-extrabold tracking-tighter lg:text-5xl">
            {formattedAmount} {token}
          </span>
        </div>
        <div>
          <span className="text-sm text-muted-foreground">
            Transaction summary
          </span>
          <div className="mt-2 w-full rounded-lg bg-background px-6">
            <div className="flex w-full items-center justify-between gap-4 border-b py-6 text-sm">
              <span className="text-sm text-muted-foreground">
                1x {name} - {description}
              </span>
              <span className="w-fit min-w-fit tracking-tighter">
                {formattedAmount} {token}
              </span>
            </div>
            <div className="flex w-full items-center justify-between py-6 text-sm">
              <span className="text-sm font-semibold">Total</span>
              <span className="font-semibold tracking-tighter">
                {formattedAmount} {token}
              </span>
            </div>
          </div>
        </div>
        <div className="mt-auto hidden w-full lg:flex">
          <PaymentLinkFooter key="footer-1" />
        </div>
      </div>
      <div className="m-auto h-full bg-background sm:basis-1/2">
        {isPaid ? (
          <div className="m-auto flex h-full flex-col items-center justify-center">
            <span className="text-3xl font-bold text-primary">
              Payment successful
            </span>
          </div>
        ) : (
          <PaymentLinkForm
            paymentLinkData={paymentLinkData}
            userWallet={userWallet}
          />
        )}
      </div>
      <div className="w-full py-4 lg:hidden">
        <PaymentLinkFooter key="footer-2" />
      </div>
    </div>
  );
};

const PaymentLinkFooter = () => {
  return (
    <div className="flex w-full flex-wrap items-center justify-between gap-4">
      <div className="flex items-center">
        <span className="mr-2 hidden font-light text-muted-foreground lg:flex">
          Powered by
        </span>
        <div
          className={cn(
            'mr-1.5 flex h-11 w-11 items-center justify-center rounded-md bg-black/5',
          )}
        >
          <LogoIcon className="scale-[0.5]" />
        </div>
        <span className="font-bold tracking-tight text-primary">Shield</span>
      </div>
      <div className="flex items-center gap-2 text-xxs font-light text-muted-foreground sm:text-xs lg:gap-4 lg:text-sm">
        <Link href={{ pathname: '/status' }}>Status</Link>
        <span>&bull;</span>
        <Link href={{ pathname: '/terms' }}>Terms</Link>
        <span>&bull;</span>
        <Link href={{ pathname: '/privacy' }}>Privacy</Link>
      </div>
    </div>
  );
};
