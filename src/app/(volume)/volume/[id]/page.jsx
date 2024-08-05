import { redirect } from 'next/navigation';

import { EditVolumeTransactionModal } from '@/features/volume';
import { getVolumeTransactionsAdmin } from '@/features/volume/actions';

export const revalidate = 60;

export default async function Page({ params: { id } }) {
  const adminTransactions = await getVolumeTransactionsAdmin();

  const transaction = adminTransactions.find(
    (transaction) => transaction._id == id,
  );

  if (!transaction) {
    redirect('/volume');
  }

  return <EditVolumeTransactionModal transaction={transaction} />;
}
