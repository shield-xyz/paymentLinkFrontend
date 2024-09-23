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
        <div className="flex w-full max-w-xs flex-col gap-4 sm:w-full">
          <Link href="https://form.typeform.com/to/t7VYyR5g" target="_blank">
            <Button className="w-full">Businesses</Button>
          </Link>
          <FootprintVerifyButton text="US Businesses" type="KYB" />
          <div className="flex  w-full flex-col items-center gap-4 sm:flex-row">
            <FootprintVerifyButton text="US Residents Only" type="KYC_US" />
            <FootprintVerifyButton text="Non US Residents" type="KYC_NON_US" />
          </div>
        </div>
      </div>
    </div>
  );
}
