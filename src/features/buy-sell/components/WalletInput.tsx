import { ChangeEvent, forwardRef } from 'react';

import { Input } from '@/components/ui/input';

interface WalletInputProps {
  wallet: string;
  setWallet: (value: string) => void;
}

const WalletInput = forwardRef<HTMLInputElement, WalletInputProps>(
  ({ wallet, setWallet }, ref) => (
    <Input
      type="text"
      className="mt-6"
      placeholder="Enter your wallet address"
      ref={ref}
      value={wallet}
      onChange={(e: ChangeEvent<HTMLInputElement>) => setWallet(e.target.value)}
    />
  ),
);

WalletInput.displayName = 'WalletInput';

export { WalletInput };
