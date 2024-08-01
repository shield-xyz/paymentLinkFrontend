import Container from '@/components/ui/container';
import { getVolumeTransactionsAdmin } from '@/features/volume/actions';
import { VolumeTransactionForm } from '@/features/volume/components/VolumeTransactionForm';

export const revalidate = 60;

export default async function Page({ params: { id } }) {
  const adminTransactions = await getVolumeTransactionsAdmin();

  const transaction = adminTransactions.find(
    (transaction) => transaction._id == id,
  );

  return (
    <div>
      <Container className="p-4">
        <VolumeTransactionForm volumeTransactionData={transaction} />
      </Container>
    </div>
  );
}
