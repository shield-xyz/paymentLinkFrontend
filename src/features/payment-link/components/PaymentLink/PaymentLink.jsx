import Image from 'next/image';
import Link from 'next/link';

import { PaymentLinkForm } from './PaymentLinkForm';

import { Icons } from '@/components';
import { env } from '@/config';
import { formatCrypto } from '@/lib/utils';

export const PaymentLink = ({ paymentLinkData }) => {
  const { merchant, amount, token, name, description } = paymentLinkData;
  const { logo, company } = merchant;

  const logoImage = `${env.NEXT_PUBLIC_API_URL}/${logo}`;

  return (
    <div className="flex h-screen min-h-screen flex-col bg-background p-5 lg:flex-row">
      <div className="flex h-full flex-col bg-muted px-4 py-6 sm:basis-1/2 sm:px-20">
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
          <span className="min-w-fit text-4xl font-extrabold tracking-tighter">
            {formatCrypto(amount, 2)} {token}
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
                {formatCrypto(amount, 2)} {token}
              </span>
            </div>
            <div className="flex w-full items-center justify-between py-6 text-sm">
              <span className="text-sm font-semibold">Total</span>
              <span className="font-semibold tracking-tighter">
                {formatCrypto(amount, 2)} {token}
              </span>
            </div>
          </div>
        </div>
        <div className="mt-auto hidden w-full lg:flex">
          <PaymentLinkFooter />
        </div>
      </div>
      <div className="h-full bg-background sm:basis-1/2">
        <PaymentLinkForm />
      </div>
      <div className="w-full py-4 lg:hidden">
        <PaymentLinkFooter />
      </div>
    </div>
  );
};

const PaymentLinkFooter = () => {
  return (
    <div className="flex w-full flex-wrap items-center justify-between gap-4">
      <div className="flex items-center">
        <span className="mr-2 font-light text-muted-foreground">
          Powered by
        </span>
        <div className="mr-1 flex h-11 w-11 items-center justify-center rounded-md bg-black/5">
          <Icons.logo className="scale-[0.5]" />
        </div>
        <span className="font-bold tracking-tight text-primary">Shield</span>
      </div>
      <div className="flex items-center gap-4 text-sm font-light text-muted-foreground">
        <Link href="/status">Status</Link>
        <span>&bull;</span>
        <Link href="/terms">Terms</Link>
        <span>&bull;</span>
        <Link href="/privacy">Privacy</Link>
      </div>
    </div>
  );
};
