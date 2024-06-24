import { Assets, Balance, RecentActivities } from '@/components';
import { getBalance } from '@/features/balance';

export default async function Page() {
  const balance = await getBalance();
  console.log({ balance });
  return (
    <div className="flex flex-col gap-2">
      <Balance />
      <div className="flex w-full gap-2">
        <Assets />
        <RecentActivities />
      </div>
    </div>
  );
}
