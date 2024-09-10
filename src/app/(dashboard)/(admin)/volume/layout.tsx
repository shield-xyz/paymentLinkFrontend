import Container from '@/components/ui/container';
import { Volume } from '@/features/volume';
import {
  getVolumeTransactionsAdmin,
  getVolumeTransactionsPerDay,
} from '@/features/volume/actions';
import { VolumeTransactionsTable } from '@/features/volume/components/VolumeTransactionsTable';

export const revalidate = 0;

export default async function Layout({ children }) {
  const [transactions, transactionsAdmin] = await Promise.all([
    getVolumeTransactionsPerDay(),
    getVolumeTransactionsAdmin(),
  ]);

  return (
    <>
      <div className="flex flex-col md:p-4 lg:gap-4">
        <Container className="overflow-auto">
          <Volume transactions={transactions} />
        </Container>
        <VolumeTransactionsTable transactions={transactionsAdmin} />
      </div>
      {children}
    </>
  );
}
