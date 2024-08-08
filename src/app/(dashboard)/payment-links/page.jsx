import { PaymentLinksTable, fetchLinks } from '@/features/payment-link';
import { auth } from '@/lib/auth';

export default async function Page() {
  const session = await auth();
  const paymentLinks = await fetchLinks(session?.accessToken);

  console.log({ session });

  return <PaymentLinksTable paymentLinks={paymentLinks} />;
}
