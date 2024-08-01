import { notFound } from 'next/navigation';

import { VolumeTransactionForm } from '@/features/volume/components/VolumeTransactionForm';
import { getServerAuthSession } from '@/lib/auth';

export const revalidate = 60;

export default async function Page() {
  const session = await getServerAuthSession();

  console.log({ session });

  const isAdmin = true; // session.user.admin;

  // TODO: make it only accessible to admin
  if (!isAdmin) {
    notFound();
  }

  return (
    <div className="m-auto max-w-5xl p-4">
      <VolumeTransactionForm />
    </div>
  );
}
