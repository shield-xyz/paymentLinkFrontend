import { redirect } from 'next/navigation';

import { EditVolumeTransactionModal } from '@/features/volume';
import { getVolumeTransactionById } from '@/features/volume/actions';

export const revalidate = 0;

export default async function Page({ params: { id } }) {
  const transaction = await getVolumeTransactionById(id);

  if (!transaction) {
    redirect('/volume');
  }

  return <EditVolumeTransactionModal transaction={transaction} />;
}
