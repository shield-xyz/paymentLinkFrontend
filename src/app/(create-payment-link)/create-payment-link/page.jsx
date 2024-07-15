import { CreatePaymentLinkForm, getNetworks } from '@/features/payment-link';

export default async function Page() {
  const networks = await getNetworks();

  return <CreatePaymentLinkForm networks={networks} />;
}
