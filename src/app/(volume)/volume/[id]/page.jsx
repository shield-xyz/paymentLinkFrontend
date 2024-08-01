import { getVolumeTransactionsAdmin } from '@/features/volume/actions';
import { VolumeTransactionForm } from '@/features/volume/components/VolumeTransactionForm';

export const revalidate = 60;

export default async function Page({ params: { id } }) {
  const adminTransactions = await getVolumeTransactionsAdmin();

  const transaction = adminTransactions.find(
    (transaction) => transaction._id == id,
  );

  return (
    <div className="m-auto max-w-5xl p-4">
      <VolumeTransactionForm volumeTransactionData={transaction} />
    </div>
  );
}
