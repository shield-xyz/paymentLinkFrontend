import { useStore } from '../store';

import { Button } from '@/components/ui/button';

export const BuyOrSellForm = ({ handleChangeStep }) => {
  const { setSide } = useStore();

  const handleClick = (side) => {
    setSide(side);
    handleChangeStep();
  };

  return (
    <div className="rounded-2xl border p-8 ">
      <div className="flex gap-4">
        <Button
          onClick={() => handleClick('buy')}
          variant="secondary"
          className="font-medium"
          size="sm"
        >
          BUY
        </Button>
        <Button
          onClick={() => handleClick('sell')}
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
