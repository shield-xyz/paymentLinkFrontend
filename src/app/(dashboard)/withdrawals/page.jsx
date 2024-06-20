import { WithdrawalsTable, getWithdrawals } from '@/features/withdrawals';
import { getServerAuthSession } from '@/lib/auth';

export default async function Page() {
  const session = await getServerAuthSession();
  const withdrawals = await getWithdrawals(session.accessToken);

  console.log({ withdrawals });

  return <WithdrawalsTable withdrawals={withdrawals} />;
}
