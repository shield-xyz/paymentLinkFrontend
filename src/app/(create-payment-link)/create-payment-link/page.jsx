import { CreatePaymentLinkForm, getNetworks } from '@/features/payment-link';

export default async function Page() {
  const networks = await getNetworks();

  console.log({ networks });

  return <CreatePaymentLinkForm networks={networks} />;
}
