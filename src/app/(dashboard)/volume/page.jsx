import Container from '@/components/ui/container';
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
    <div className="flex flex-col lg:gap-4">
      <Container className="overflow-auto">
        <Volume transactions={transactions} />
      </Container>
      <VolumeTransactionsTable transactions={transactionsAdmin} />
    </div>
  );
}
