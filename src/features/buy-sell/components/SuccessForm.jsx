import Image from 'next/image';
import Link from 'next/link';

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
        We will notify you once the transaction is confirmed.
      </div>
      <Link href="/dashboard">
        <Button className="mt-4 w-full font-medium">Confirm</Button>
      </Link>
    </div>
  );
};
