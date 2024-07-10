import { Icons } from '@/components';
import { ACTIVITY_TYPES, cn } from '@/lib/utils';

const ActivityIcon = ({ type }) => {
  return (
    <div
      className={cn(
        'relative flex h-10 w-10 items-center justify-center rounded-md',
        {
          'bg-gray-100': type === ACTIVITY_TYPES.Withdrawal,
          'border border-gray-200 bg-background':
            type === ACTIVITY_TYPES.Transaction,
        },
      )}
    >
      <Icons.arrowNarrowUpRight
        className={cn('h-4 w-4', {
          'rotate-180': type === ACTIVITY_TYPES.Withdrawal,
        })}
      />
    </div>
  );
};

export default ActivityIcon;
