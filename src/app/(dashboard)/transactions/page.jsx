import { getAssets } from '@/actions/getAssets';
import { getNetworks } from '@/features/payment-link';
import { TransactionsTable, getTransactions } from '@/features/transactions';
import { getServerAuthSession } from '@/lib/auth';

export default async function Page() {
  const session = await getServerAuthSession();
  const [transactions, assets, networks] = await Promise.all([
    getTransactions(session.accessToken),
    getAssets(),
    getNetworks(),
  ]);

  const assetsObject = assets.reduce((acc, asset) => {
    acc[asset.assetId] = asset;
    return acc;
  }, {});

  return (
    <TransactionsTable
      transactions={transactions}
      assets={assetsObject}
      networks={networks}
    />
  );
}
