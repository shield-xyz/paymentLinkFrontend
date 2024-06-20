import { Icons } from '@/components';
import { TYPES, cn } from '@/lib/utils';

const WithdrawTypeIcon = ({ type }) => {
  return (
    <div
      className={cn(
        'relative flex h-10 w-10 items-center justify-center rounded-md',
        {
          'bg-gray-100': type === TYPES.Deposit,
          'border border-gray-200 bg-background': type === TYPES.Withdrawal,
        },
      )}
    >
      <Icons.arrowNarrowUpRight className="h-4 w-4" />
    </div>
  );
};

export default WithdrawTypeIcon;
