import { PaymentLink } from '@/features/payment-link';
import { getPaymentLinkData } from '@/features/payment-link/actions';

export default async function Page({ searchParams }) {
  const { id } = searchParams;
  const paymentLinkData = await getPaymentLinkData(id);

  // TODO: Handle error if paymentLinkData is undefined

  return <PaymentLink paymentLinkData={paymentLinkData} />;
}
