import { forwardRef } from 'react';

import { Input } from '@/components/ui/input';

const WalletInput = forwardRef(({ wallet, setWallet }, ref) => (
  <Input
    type="text"
    className="mt-6"
    placeholder="Enter your wallet address"
    ref={ref}
    value={wallet}
    onChange={(e) => setWallet(e.target.value)}
  />
));

WalletInput.displayName = 'WalletInput';

export { WalletInput };
