import { Button } from '@/components/ui/button';
import Spinner from '@/components/ui/spinner';

const WireCard = ({ quote, disabled, loading, onWire }) => {
  return (
    <div className="rounded-lg border-2 border-blue-300 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div>Wire</div>
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
        disabled={disabled | loading}
        className="mt-4 w-full"
        onClick={onWire}
      >
        {loading ? <Spinner /> : 'Continue with the wire'}
      </Button>
    </div>
  );
};

export { WireCard };
