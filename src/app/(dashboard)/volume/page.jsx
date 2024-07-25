import { notFound } from 'next/navigation';

import { Volume } from '@/features/volume';
import { getTronTransactions } from '@/features/volume/actions';

export default async function Page() {
  const [transactions] = await Promise.all([
    getTronTransactions('TWNxsGw1o4rnP4FExQSEXuYzLtXm3dMkRd'),
  ]);

  console.log('Tron transactions:', transactions);

  // Only admins can access this page
  const isAdmin = true; // TODO: Check if user is admin

  if (!isAdmin) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-2">
      <Volume transactions={transactions} />
    </div>
  );
}
