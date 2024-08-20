import { Icons } from '@/components';
import { FootprintVerifyButton } from '@/features/auth/components/verify';

export default async function Page() {
  return (
    <div className="flex h-full min-h-dvh w-screen flex-col items-center justify-center">
      <div className="m-auto flex flex-col items-center gap-1">
        <div className="mb-8 flex flex-col items-center justify-center gap-4">
          <Icons.logo />
          <h1 className="text-4xl font-bold">Please Verify</h1>
        </div>
        <div className="flex flex-col gap-4">
          <FootprintVerifyButton text="Businesses" type="KYB" />
          <div className="flex items-center gap-4">
            <FootprintVerifyButton text="US Residents Only" type="KYC_US" />
            <FootprintVerifyButton text="Non US Residents" type="KYC_NON_US" />
          </div>
        </div>
      </div>
    </div>
  );
}
