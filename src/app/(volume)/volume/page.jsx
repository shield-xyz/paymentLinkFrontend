import { Volume } from '@/features/volume';
import {
  getVolumeTransactionsAdmin,
  getVolumeTransactionsPerDay,
} from '@/features/volume/actions';
import { VolumeTransactionsTable } from '@/features/volume/components/VolumeTransactionsTable';
import { getServerAuthSession } from '@/lib/auth';

export const revalidate = 60;

export default async function Page() {
  const session = await getServerAuthSession();

  const [transactions, transactionsAdmin] = await Promise.all([
    getVolumeTransactionsPerDay(),
    getVolumeTransactionsAdmin(session?.accessToken),
  ]);

  return (
    <div>
      <Volume transactions={transactions} />
      <VolumeTransactionsTable transactions={transactionsAdmin} />
    </div>
  );
}
