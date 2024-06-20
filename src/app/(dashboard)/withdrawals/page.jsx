import { getAssets } from '@/actions/getAssets';
import { WithdrawalsTable, getWithdrawals } from '@/features/withdrawals';
import { getServerAuthSession } from '@/lib/auth';

export default async function Page() {
  const session = await getServerAuthSession();
  const [withdrawals, assets] = await Promise.all([
    getWithdrawals(session.accessToken),
    getAssets(),
  ]);

  const assetsObject = assets.reduce((acc, asset) => {
    acc[asset.assetId] = asset;
    return acc;
  }, {});

  return <WithdrawalsTable withdrawals={withdrawals} assets={assetsObject} />;
}
