import { BuyOrSellForm } from '@/features/buy-sell';
import { getBankingData } from '@/features/settings';
import { auth } from '@/lib/auth';

export default async function Page() {
  const session = await auth();
  const bankingData = await getBankingData();
  return <BuyOrSellForm session={session} bankingData={bankingData} />;
}
