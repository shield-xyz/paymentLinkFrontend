import Image from 'next/image';

import { Button } from '@/components/ui/button';

export const SuccessForm = () => {
  return (
    <div className="rounded-2xl border p-8">
      <div className="text-black/30">Payment Successful</div>
      <Image
        width={400}
        height={400}
        className="mx-auto mt-8"
        src="/images/SuccessPlaceholder.png"
        alt="QR CODE Placeholder only"
      />
      <div className="mt-4 text-black/30">
        We sent $4,434.18 USD to your bank account
      </div>

      <Button className="mt-4 w-full font-medium">Confirm</Button>
    </div>
  );
};
