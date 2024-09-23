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
          <Link href="https://form.typeform.com/to/t7VYyR5g" target="_blank">
            <Button className="w-full">Non US Businesses</Button>
          </Link>
          <FootprintVerifyButton text="US Residents" type="KYC_US" />
          <FootprintVerifyButton text="Non US Residents" type="KYC_NON_US" />
        </div>
      </div>
    </div>
  );
}
