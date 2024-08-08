import { getAssets } from '@/actions/getAssets';
import {
  WithdrawalsTable,
  getRampWithdrawals,
  getWithdrawals,
} from '@/features/withdrawals';
import { auth } from '@/lib/auth';

export default async function Page() {
  const session = await auth();
  const [withdrawals, rampWithdrawals, assets] = await Promise.all([
    getWithdrawals(session.accessToken),
    getRampWithdrawals(session.accessToken),
    getAssets(),
  ]);

  const assetsObject = assets.reduce((acc, asset) => {
    acc[asset.assetId] = asset;
    return acc;
  }, {});

  const mergedWithdrawals = [
    ...withdrawals,
    ...rampWithdrawals.map((withdrawal) => {
      const txn = withdrawal.transactionDetails;
      return {
        assetId: txn.assetId,
        amount: txn.amountTransferred ?? txn.amountToTransfer,
        date: withdrawal.createdAt,
        status:
          withdrawal.status === 'notified' ? 'pending' : withdrawal.status,
      };
    }),
  ];

  return (
    <WithdrawalsTable withdrawals={mergedWithdrawals} assets={assetsObject} />
  );
}
