'use client';

import { FUNDING, PayPalButtons } from '@paypal/react-paypal-js';
import { Info } from 'lucide-react';

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';

interface Props {
  disabled: boolean;
  quote: any;
  onClick?: any;
  createOrder: any;
  onCancel: any;
  onApprove: any;
  onError?: any;
}

const PayPalCard = ({
  disabled,
  quote,
  onClick,
  createOrder,
  onCancel,
  onApprove,
  onError,
}: Props) => {
  return (
    <div className="rounded-lg border-2 border-blue-300 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div>Paypal</div>
          <HoverCard>
            <HoverCardTrigger>
              <Info className="ml-2" size={15} />
            </HoverCardTrigger>
            <HoverCardContent>
              <ul className="text-sm">
                <li>Fee: 3.49 % + fixed fee</li>
              </ul>
            </HoverCardContent>
          </HoverCard>
        </div>
        <div className="text-end">
          <div className="flex items-center gap-2 font-bold">
            <span>≈</span>
            <div>
              {quote.amountOut} {quote.assetOut}
            </div>
          </div>
          <div className="text-gray-500">
            {quote.amountIn} {quote.assetIn}
          </div>
        </div>
      </div>
      <PayPalButtons
        disabled={disabled}
        fundingSource={FUNDING.PAYPAL}
        className="mt-4"
        onClick={onClick}
        createOrder={createOrder}
        onCancel={onCancel}
        onApprove={onApprove}
        onError={onError}
      />
    </div>
  );
};

export { PayPalCard };
