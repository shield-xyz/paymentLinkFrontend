import { BuyOrSellForm } from '@/features/buy-sell';
import { getBankingData } from '@/features/settings';

export default async function Page() {
  const bankingData = await getBankingData();
  return <BuyOrSellForm bankingData={bankingData} />;
}
