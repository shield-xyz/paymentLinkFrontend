import { Assets, Balance, RecentActivities } from '@/components';
import { getBalances } from '@/features/balance';
import { getTransactions } from '@/features/transactions';
import { getServerAuthSession } from '@/lib/auth';

export default async function Page() {
  const session = await getServerAuthSession();
  const [balances, transactions] = await Promise.all([
    getBalances(),
    getTransactions(session.accessToken),
  ]);

  return (
    <div className="flex flex-col gap-2">
      <Balance balances={balances} transactions={transactions} />
      <div className="flex w-full flex-col gap-2 xl:flex-row">
        <Assets balances={balances} />
        <RecentActivities />
      </div>
    </div>
  );
}
