import { Assets, Balance, RecentActivities } from '@/components';

export default function Page() {
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
