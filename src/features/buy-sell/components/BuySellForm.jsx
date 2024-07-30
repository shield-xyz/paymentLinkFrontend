import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { LogoIcon } from '@/assets';

export const BuySellFrom = () => {
  // const STEPS = {
  //     1: <StepOne form={form} networks={networks} />,
  //     2: <StepTwo link={link} />,
  //   };

  return (
    <div className='flex flex-col justify-center items-center gap-8'>
      <div className='flex items-center'>
        <div
          className={cn(
            'mr-1.5 flex h-11 w-11 items-center justify-center rounded-md bg-black/5',
          )}
        >
          <LogoIcon className="scale-[0.5]" />
        </div>
        <div className='text-3xl font-semibold'>Shield</div>
      </div>

      <div>
        <ul>
          <li>
            <Button variant="outline" className="font-light">
              Buy or Sell
            </Button>
          </li>
          <li>
            <Button variant="outline" className="font-light">
              Select token
            </Button>
          </li>
          <li>
            <Button variant="outline" className="font-light">
              Waiting for payment
            </Button>
          </li>
          <li>
            <Button variant="outline" className="font-light">
              Processing payment
            </Button>
          </li>
          <li>
            <Button variant="outline" className="font-light">
              Success
            </Button>
          </li>
        </ul>

        <div>
          <div>
            <Button variant="secondary" className="font-light" size="sm">
              BUY
            </Button>
            <Button className="font-light" size="sm">
              SELL
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
