import { Assets, Balance, RecentActivities } from '@/components';
import { getBalances } from '@/features/balance';

export default async function Page() {
  const [balances] = await Promise.all([getBalances()]);

  return (
    <div className="flex flex-col gap-2">
      <Balance balances={balances} />
      <div className="flex w-full flex-col gap-2 xl:flex-row">
        <Assets balances={balances} />
        <RecentActivities />
      </div>
    </div>
  );
}
