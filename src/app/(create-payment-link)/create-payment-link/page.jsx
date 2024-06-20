import { getAssets } from '@/actions/getAssets';
import { CreatePaymentLinkForm } from '@/features/payment-link';

export default async function Page() {
  const assets = await getAssets();

  return <CreatePaymentLinkForm assets={assets} />;
}
