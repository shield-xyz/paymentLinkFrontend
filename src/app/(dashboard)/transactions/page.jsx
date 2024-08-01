import { TransactionsTable, getTransactions } from '@/features/transactions';
import { getServerAuthSession } from '@/lib/auth';

export default async function Page() {
  const session = await getServerAuthSession();
  const [transactions] = await Promise.all([
    getTransactions(session?.accessToken),
  ]);

  return <TransactionsTable transactions={transactions} />;
}
