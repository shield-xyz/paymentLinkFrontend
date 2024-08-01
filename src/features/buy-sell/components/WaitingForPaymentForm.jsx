import QRCode from 'qrcode.react';

import { useStore } from '../store';

import { Icons } from '@/components';
import { Button } from '@/components/ui/button';

export const WaitingForPaymentForm = ({ handleChangeStep }) => {
  const { selectedNetwork, selectedAsset, amount } = useStore();

  return (
    <div className="rounded-2xl border p-8">
      <div className="text-black/30">Scan/Send Deposit</div>
      <div className="flex items-center justify-center p-8">
        <QRCode value={selectedNetwork.deposit_address} size={200} />
      </div>
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

      <Button onClick={handleChangeStep} className="mt-8 w-full font-medium">
        I have paid!
      </Button>
    </div>
  );
};
