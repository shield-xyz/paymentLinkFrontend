import { Assets, Balance, RecentActivities } from '@/components';
import { getBalances } from '@/features/balance';
import { getTotalTransactionsAmount } from '@/features/transactions';
import { getServerAuthSession } from '@/lib/auth';




export default async function Page() {
  const [balances] = await Promise.all([getBalances()]);
  const session = await getServerAuthSession();
  const [totalAmountTransactions] = await Promise.all([
    getTotalTransactionsAmount(session.accessToken),
  ]);


  return (
    <div className="flex flex-col gap-2">
      <Balance balances={balances} totalAmount={totalAmountTransactions} />
      <div className="flex w-full flex-col gap-2 xl:flex-row">
        <Assets balances={balances} />
        <RecentActivities />
      </div>
    </div>
  );
}
