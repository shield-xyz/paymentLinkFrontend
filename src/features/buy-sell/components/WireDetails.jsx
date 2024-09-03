'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import Spinner from '@/components/ui/spinner';

const WireDetails = ({ onConfirm }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="p-8">
      <div className="text-black/30">Bank Transfer</div>
      <div className="mt-4 flex flex-col gap-2 text-sm">
        <span>
          <b>Beneficiary Name:</b> Xellar Technologies Inc.
        </span>
        <span>
          <b>Account Number:</b> 202415019079
        </span>
        <span>
          <b>Beneficiary Address:</b> 701 Tillery Street Unit 12, 2563, Austin,
          TX 78702
        </span>
        <span>
          <b>Routing Number:</b> 091311229
        </span>
        <span>
          <b>Bank Name:</b> Choice Financial Group
        </span>
        <span>
          <b>Bank Address:</b> 4501 23rd Avenue S, Fargo, ND 58104
        </span>
      </div>
      <Button
        className="mt-8 w-full"
        disabled={isLoading}
        onClick={async () => {
          setIsLoading(true);
          await onConfirm();
          setIsLoading(false);
        }}
      >
        {isLoading ? <Spinner /> : 'I have made the wire transfer'}
      </Button>
    </div>
  );
};

export { WireDetails };
