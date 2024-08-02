import Error from '../error';

import Container from '@/components/ui/container';
import { Volume } from '@/features/volume';
import {
  getVolumeTransactionsAdmin,
  getVolumeTransactionsPerDay,
} from '@/features/volume/actions';
import { VolumeTransactionsTable } from '@/features/volume/components/VolumeTransactionsTable';
import { getServerAuthSession } from '@/lib/auth';

export const revalidate = 60;

export default async function Layout({ children }) {
  const session = await getServerAuthSession();

  const [transactions, transactionsAdmin] = await Promise.all([
    getVolumeTransactionsPerDay(),
    getVolumeTransactionsAdmin(session?.accessToken),
  ]);

  const isAdmin = session?.user.admin;
  if (!isAdmin) {
    return <Error statusCode={401} session={session} />;
  }

  return (
    <>
      <div className="flex flex-col md:p-4 lg:gap-4">
        <Container className="overflow-auto">
          <Volume transactions={transactions} />
        </Container>
        <VolumeTransactionsTable transactions={transactionsAdmin} />
      </div>
      {children}
    </>
  );
}
