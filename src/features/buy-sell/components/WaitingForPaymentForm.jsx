import Image from 'next/image';

import { Icons } from '@/components';
import { Button } from '@/components/ui/button';

export const WaitingForPaymentForm = ({ handleChangeStep }) => {
  return (
    <div className="rounded-2xl border p-8">
      <div className="text-black/30">Scan/Send Deposit</div>
      <Image
        width={400}
        height={400}
        className="mx-auto mt-8"
        src="/images/QRCodePlaceholder.png"
        alt="QR CODE Placeholder only"
      />
      <div className="mt-4 flex justify-between gap-8">
        <div className="text-black/60">Address</div>
        <div className="flex gap-4">
          <div>1Lbcfr7sAHTD9CgdQo3HTMTkV8LK4ZnX71</div>
          <Icons.copy />
        </div>
      </div>
      <div className="mt-4 flex justify-between">
        <div className="text-black/60">Total price</div>
        <div className="flex gap-2">
          <div>1.96 ETH</div>
          <div className="font-bold text-black/20">($4,434.18)</div>
        </div>
      </div>

      <Button onClick={handleChangeStep} className="mt-8 w-full font-medium">
        I have paid!
      </Button>
    </div>
  );
};
