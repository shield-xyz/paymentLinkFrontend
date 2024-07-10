import Container from '@/components/ui/container';
import { WithdrawTypeIcon } from '@/features/withdrawals';
import { TYPES } from '@/lib/utils';

export const RecentActivities = ({ transactions, withdrawals }) => {
  console.log({ transactions, withdrawals });

  return (
    <Container className="w-full px-5 py-6">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Recent activities</h3>
        {/* <span className="flex items-center text-sm tracking-tight text-primary">
          See all <Icons.chevronRight className="h-4" />
        </span> */}
      </div>
      <div className="mt-8 flex flex-col gap-8">
        {transactions.slice(0, 5).map((activity, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center">
              <WithdrawTypeIcon
                type={index % 2 === 0 ? TYPES.Deposit : TYPES.Withdrawal}
              />
              <div className="ml-4">
                <h4 className="text-sm font-medium">{activity.name}</h4>
                <span className="text-xs text-gray-400">
                  <span className="text-green-500">{'completed'}</span>
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className={`text-xs`}>
                {activity.amount > 0 ? '+' : ''}
                {activity.amount} {activity.asset.symbol}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};
