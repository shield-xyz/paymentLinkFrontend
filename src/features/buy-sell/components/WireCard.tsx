import { Info } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import Spinner from '@/components/ui/spinner';

const WireCard = ({
  quote,
  disabled,
  loading,
  onWire,
}: {
  quote: any;
  disabled: boolean;
  loading: boolean;
  onWire: () => void;
}) => {
  return (
    <div className="rounded-lg border-2 border-blue-300 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div>Wire</div>
          <HoverCard>
            <HoverCardTrigger>
              <Info className="ml-2" size={15} />
            </HoverCardTrigger>
            <HoverCardContent>
              <ul className="text-sm">
                <li>Shield's Fee: 1%</li>
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
      <Button
        disabled={disabled || loading}
        className="mt-4 w-full"
        onClick={onWire}
      >
        {loading ? <Spinner /> : 'Continue with the wire'}
      </Button>
    </div>
  );
};

export { WireCard };
