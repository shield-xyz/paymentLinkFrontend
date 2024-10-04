import Link from 'next/link';

import { Icons } from '@/components';
import { Button } from '@/components/ui/button';
import { FootprintVerifyButton } from '@/features/auth/components/verify';

export default async function Page() {
  return (
    <div className="flex h-full min-h-dvh w-screen flex-col items-center justify-center">
      <div className="m-auto flex w-full flex-col items-center gap-1 px-4">
        <div className="mb-8 flex flex-col items-center justify-center gap-4 text-center">
          <Icons.logo />
          <h1 className="text-4xl font-bold">Please Verify</h1>
        </div>
        <div className="grid w-full max-w-sm grid-cols-1 gap-4 sm:w-full sm:grid-cols-2">
          <FootprintVerifyButton text="US Businesses" type="KYB" />
          <Link
            href="https://shieldpay.typeform.com/to/vphWHfkz"
            target="_blank"
          >
            <Button className="w-full">Non US Businesses</Button>
          </Link>
          <FootprintVerifyButton text="US Residents" type="KYC_US" />
          <FootprintVerifyButton text="Non US Residents" type="KYC_NON_US" />
        </div>
      </div>
      <div className="absolute bottom-4 left-auto right-auto flex px-10">
        <h3 className="text-justify text-xs font-light">
          By completing the verification process, you acknowledge that you have
          read through our{' '}
          <a href="https://getshield.xyz/terms" target="_blank">
            <b className="underline">Terms and Conditions</b>
          </a>{' '}
          and consent to the written guidelines.
        </h3>
      </div>
    </div>
  );
}
