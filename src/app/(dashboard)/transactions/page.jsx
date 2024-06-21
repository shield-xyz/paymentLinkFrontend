import { getAssets } from '@/actions/getAssets';
import { TransactionsTable, getTransactions } from '@/features/transactions';
import { getServerAuthSession } from '@/lib/auth';

export default async function Page() {
  const session = await getServerAuthSession();
  const [transactions, assets] = await Promise.all([
    getTransactions(session.accessToken),
    getAssets(),
  ]);

  const assetsObject = assets.reduce((acc, asset) => {
    acc[asset.assetId] = asset;
    return acc;
  }, {});

  return (
    <TransactionsTable transactions={transactions} assets={assetsObject} />
  );
}
