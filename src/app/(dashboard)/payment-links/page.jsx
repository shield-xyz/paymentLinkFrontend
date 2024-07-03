import { PaymentLinksTable, fetchLinks } from '@/features/payment-link';
import { getServerAuthSession } from '@/lib/auth';

export default async function Page() {
  const session = await getServerAuthSession();
  const paymentLinks = await fetchLinks(session.accessToken);

  return <PaymentLinksTable paymentLinks={paymentLinks} />;
}
