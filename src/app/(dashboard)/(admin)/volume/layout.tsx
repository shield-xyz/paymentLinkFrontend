import Container from '@/components/ui/container';
import { Volume } from '@/features/volume';
import { getVolumeTransactions } from '@/features/volume/actions';

export const revalidate = 0;

export default async function Layout({ children }) {
  const transactions = await getVolumeTransactions();

  return (
    <>
      <div className="flex flex-col md:p-4 lg:gap-4">
        <Container className="overflow-auto">
          <Volume transactions={transactions} />
        </Container>
        {/* <VolumeTransactionsTable transactions={transactionsAdmin} /> */}
      </div>
      {children}
    </>
  );
}
