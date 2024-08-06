import { getAssets } from '@/actions';
import { DepositsTable, getDeposits } from '@/features/deposits';
import { getServerAuthSession } from '@/lib/auth';

export default async function Page() {
  const session = await getServerAuthSession();
  const [deposits, assets] = await Promise.all([
    getDeposits(session.accessToken),
    getAssets(),
  ]);

  const assetsObject = assets.reduce((acc, asset) => {
    acc[asset.assetId] = asset;
    return acc;
  }, {});

  return <DepositsTable deposits={deposits} assets={assetsObject} />;
}
