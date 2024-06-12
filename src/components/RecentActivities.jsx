import { Icons } from './Icons';
import Container from './ui/container';

import { cn } from '@/lib/utils';

const RecentActivities = () => {
  const TYPES = { Deposit: 'Deposit', Withdrawal: 'Withdrawal' };

  const ACTIVITIES = [
    {
      name: 'EZE LLC',
      completed: true,
      symbol: 'USD',
      amount: 1000,
      type: TYPES.Deposit,
    },
    {
      name: 'EZE LLC',
      completed: true,
      symbol: 'USDT',
      amount: 1.32,
      type: TYPES.Deposit,
    },
    {
      name: 'EZE LLC',
      completed: true,
      symbol: 'USD',
      amount: -10288.96,
      type: TYPES.Deposit,
    },
    {
      name: 'EZE LLC',
      completed: true,
      symbol: 'USD',
      amount: -10288.96,
      type: TYPES.Deposit,
    },
    {
      name: 'EZE LLC',
      completed: true,
      symbol: 'USD',
      amount: -10288.96,
      type: TYPES.Deposit,
    },
  ];

  return (
    <Container className="w-full px-5 py-6">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Recent activities</h3>
        <span className="flex items-center text-sm tracking-tight text-primary">
          See all <Icons.chevronRight className="h-4" />
        </span>
      </div>
      <div className="mt-8 flex flex-col gap-8">
        {ACTIVITIES.map((activity, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center">
              <div
                className={cn(
                  'relative flex h-10 w-10 items-center justify-center rounded-md',
                  {
                    'bg-gray-100': index % 2 === 0,
                    'border border-gray-200 bg-background': index % 2 !== 0,
                  },
                )}
              >
                <Icons.arrowNarrowUpRight className="h-4 w-4" />
              </div>
              <div className="ml-4">
                <h4 className="text-sm font-medium">{activity.name}</h4>
                <span className="text-xs text-gray-400">
                  {activity.type === TYPES.Deposit ? (
                    <span className="text-green-500">Completed</span>
                  ) : null}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className={`text-xs`}>
                {activity.amount > 0 ? '+' : ''}
                {activity.amount} {activity.symbol}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default RecentActivities;
