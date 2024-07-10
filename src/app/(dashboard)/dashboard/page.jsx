import {
  Assets,
  Balance,
  RecentActivities,
  getBalances,
} from '@/features/dashboard';
import { getTransactions } from '@/features/transactions';
import { getWithdrawals } from '@/features/withdrawals';
import { getServerAuthSession } from '@/lib/auth';

export default async function Page() {
  const session = await getServerAuthSession();
  const [balances, transactions, withdrawals] = await Promise.all([
    getBalances(session.accessToken),
    getTransactions(session.accessToken),
    getWithdrawals(session.accessToken),
  ]);

  return (
    <div className="flex flex-col gap-2">
      <Balance balances={balances} transactions={transactions} />
      <div className="flex w-full flex-col gap-2 xl:flex-row">
        <Assets balances={balances} />
        <RecentActivities
          withdrawals={withdrawals}
          transactions={transactions}
        />
      </div>
    </div>
  );
}
