import { PaymentLinksTable } from '@/features/payment-link';
import { fetchLinks } from '@/features/payment-link/actions';
import { getServerAuthSession } from '@/lib/auth';

export default async function Page() {
  const session = await getServerAuthSession();
  const paymentLinks = await fetchLinks(session.accessToken);

  return <PaymentLinksTable paymentLinks={paymentLinks} />;
}
