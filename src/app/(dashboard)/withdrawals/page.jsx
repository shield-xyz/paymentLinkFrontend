import { fetchLinks } from '@/features/payment-link/actions';
import { WithdrawalsTable } from '@/features/withdraw';
import { getServerAuthSession } from '@/lib/auth';

export default async function Page() {
  const session = await getServerAuthSession();
  const paymentLinks = await fetchLinks(session.accessToken);

  return <WithdrawalsTable paymentLinks={paymentLinks} />;
}
