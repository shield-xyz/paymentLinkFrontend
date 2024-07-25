import { Volume } from '@/features/volume';
import { getVolumeTransactionsPerDay } from '@/features/volume/actions';

export const revalidate = 60;

export default async function Page() {
  const [transactions] = await Promise.all([getVolumeTransactionsPerDay()]);

  return (
    <div className="flex flex-col gap-2">
      <Volume transactions={transactions} />
    </div>
  );
}
