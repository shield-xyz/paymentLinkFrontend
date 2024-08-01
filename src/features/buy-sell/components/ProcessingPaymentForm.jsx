import Image from 'next/image';

import { useStore } from '../store';

import { Icons } from '@/components';
import { Button } from '@/components/ui/button';

export const ProcessingPaymentForm = ({ handleChangeStep }) => {
  const { selectedNetwork, selectedAsset, amount } = useStore();

  return (
    <div className="rounded-2xl border p-8">
      <div className="text-black/30">Payment Processing</div>
      <Image
        width={400}
        height={400}
        className="mx-auto mt-8"
        src="/images/ProcessingPlaceholder.png"
        alt="QR CODE Placeholder only"
      />
      <div className="mt-4 flex justify-between gap-8">
        <div className="text-black/60">Address</div>
        <div className="flex gap-4">
          <div>{selectedNetwork.deposit_address}</div>
          <Icons.copy />
        </div>
      </div>
      <div className="mt-4 flex justify-between">
        <div className="text-black/60">Total amount</div>
        <div className="flex gap-2">
          <div>
            {amount} {selectedAsset.symbol}
          </div>
        </div>
      </div>

      <Button
        onClick={handleChangeStep}
        variant="outline"
        className="mt-8 w-full font-medium text-black/60"
      >
        Processing
      </Button>
    </div>
  );
};
