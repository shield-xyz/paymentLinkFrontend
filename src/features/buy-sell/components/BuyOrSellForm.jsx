import { Button } from '@/components/ui/button';

export const BuyOrSellForm = ({ handleChangeStep }) => {
  return (
    <div className="rounded-2xl border p-8">
      <div className="flex gap-4">
        <Button
          onClick={handleChangeStep}
          variant="secondary"
          className="font-medium"
          size="sm"
        >
          BUY
        </Button>
        <Button
          onClick={handleChangeStep}
          variant="secondary"
          className="font-medium"
          size="sm"
        >
          SELL
        </Button>
      </div>
    </div>
  );
};
