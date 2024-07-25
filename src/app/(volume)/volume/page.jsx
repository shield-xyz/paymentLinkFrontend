import { Volume } from '@/features/volume';
import { getVolumeTransactionsPerDay } from '@/features/volume/actions';

export const revalidate = 60;

export default async function Page() {
  const [transactions] = await Promise.all([getVolumeTransactionsPerDay()]);

  return (
    <html className="bg-black">
      <Volume transactions={transactions} />
    </html>
  );
}
