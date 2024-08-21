import { Icons } from '@/components';
import { FootprintVerifyButton } from '@/features/auth/components/verify';

export default async function Page() {
  return (
    <div className="justify-cente flex h-full min-h-dvh w-screen flex-col items-center">
      <div className="m-auto flex w-full flex-col items-center gap-1 px-4">
        <div className="mb-8 flex flex-col items-center justify-center gap-4">
          <Icons.logo />
          <h1 className="text-4xl font-bold">Please Verify</h1>
        </div>
        <div className="flex w-full flex-col gap-4 sm:w-fit">
          <FootprintVerifyButton text="Businesses" type="KYB" />
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <FootprintVerifyButton text="US Residents Only" type="KYC_US" />
            <FootprintVerifyButton text="Non US Residents" type="KYC_NON_US" />
          </div>
        </div>
      </div>
    </div>
  );
}
