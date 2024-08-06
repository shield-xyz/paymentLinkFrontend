import { getRampTransactions } from '@/features/ramps';
import { RampsTable } from '@/features/ramps/components';
import { getServerAuthSession } from '@/lib/auth';

export default async function Page() {
  const session = await getServerAuthSession();
  const [transactions] = await Promise.all([
    await getRampTransactions(session.accessToken),
  ]);

  return <RampsTable transactions={transactions} />;
}