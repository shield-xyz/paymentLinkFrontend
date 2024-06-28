import { notFound } from 'next/navigation';

import { PaymentLink } from '@/features/payment-link';
import { getPaymentLinkData } from '@/features/payment-link/actions';
import { getUserWallet } from '@/services';

export const revalidate = 0;

export default async function Page({ searchParams }) {
  const { id } = searchParams;
  const paymentLinkData = await getPaymentLinkData(id);

  console.log({ paymentLinkData });

  if (!paymentLinkData) {
    notFound();
  }

  const userWallet = await getUserWallet({
    userId: paymentLinkData.user._id,
    networkId: paymentLinkData.asset.networkId,
  });

  return (
    <PaymentLink paymentLinkData={paymentLinkData} userWallet={userWallet} />
  );
}
