import { Assets, Balance, RecentActivities } from '@/components';
import { getBalances } from '@/features/balance';
import { getTransactions } from '@/features/transactions';
import { getServerAuthSession } from '@/lib/auth';

export default async function Page() {
  const session = await getServerAuthSession();
  const [balances, { totalAmount }] = await Promise.all([
    getBalances(),
    getTransactions(session.accessToken),
  ]);

  return (
    <div className="flex flex-col gap-2">
      <Balance balances={balances} totalAmount={totalAmount} />
      <div className="flex w-full flex-col gap-2 xl:flex-row">
        <Assets balances={balances} />
        <RecentActivities />
      </div>
    </div>
  );
}
