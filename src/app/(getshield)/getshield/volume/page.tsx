import { Volume } from '@/features/volume';
import { getVolumeTransactions } from '@/features/volume/actions';

export const revalidate = 60;

export default async function Page() {
  const transactions = await getVolumeTransactions();

  return <Volume transactions={transactions} />;
}
