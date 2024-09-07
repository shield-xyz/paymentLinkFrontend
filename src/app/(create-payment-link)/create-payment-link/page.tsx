import { CreatePaymentLinkForm, getNetworks } from '@/features/payment-link';

export const revalidate = 0;

export default async function Page() {
  const networks = await getNetworks();

  return <CreatePaymentLinkForm networks={networks} />;
}
