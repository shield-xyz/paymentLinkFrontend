import { Volume } from '@/features/volume';
import { getVolumeTransactionsPerDay } from '@/features/volume/actions';

export const revalidate = 60;

export default async function Page() {
  const transactions = await getVolumeTransactionsPerDay();

  return <Volume transactions={transactions} />;
}
