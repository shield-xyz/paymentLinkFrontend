import { Icons } from './Icons';
import Container from './ui/container';

import { WithdrawTypeIcon } from '@/features/withdraw';
import { STATUSES, TYPES } from '@/lib/utils';

const ACTIVITIES = [
  {
    name: 'EZE LLC',
    status: STATUSES.Completed,
    symbol: 'USD',
    amount: 1000,
    type: TYPES.Deposit,
  },
  {
    name: 'EZE LLC',
    status: STATUSES.Completed,
    symbol: 'USDT',
    amount: 1.32,
    type: TYPES.Deposit,
  },
  {
    name: 'EZE LLC',
    status: STATUSES.Completed,
    symbol: 'USD',
    amount: -10288.96,
    type: TYPES.Deposit,
  },
  {
    name: 'EZE LLC',
    status: STATUSES.Completed,
    symbol: 'USD',
    amount: -10288.96,
    type: TYPES.Deposit,
  },
  {
    name: 'EZE LLC',
    status: STATUSES.Completed,
    symbol: 'USD',
    amount: -10288.96,
    type: TYPES.Deposit,
  },
];

const RecentActivities = () => {
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
              <WithdrawTypeIcon
                type={index % 2 === 0 ? TYPES.Deposit : TYPES.Withdrawal}
              />
              <div className="ml-4">
                <h4 className="text-sm font-medium">{activity.name}</h4>
                <span className="text-xs text-gray-400">
                  {activity.type === TYPES.Deposit ? (
                    <span className="text-green-500">{activity.status}</span>
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
