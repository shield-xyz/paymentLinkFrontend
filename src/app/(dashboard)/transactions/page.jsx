import { TransactionsTable, getTransactions } from '@/features/transactions';
import { auth } from '@/lib/auth';

export default async function Page() {
  const session = await auth();
  const [transactions] = await Promise.all([
    getTransactions(session?.accessToken),
  ]);

  return <TransactionsTable transactions={transactions} />;
}
