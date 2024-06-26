import { Icons } from './Icons';
import Chart from './Recharts/Chart';
import Container from './ui/container';

import { Withdraw } from '@/features/withdrawals';

const Balance = ({ balances }) => {
  console.log({ balances });
  return (
    <Container className="p-4 xl:p-0">
      <div className="px-5 pt-5">
        <span className="mb-2 flex items-center gap-4 text-xl font-medium">
          Total Balance <Icons.chevronRight />
        </span>
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-semibold">$3,200</span>
            <span className="text-5xl font-semibold text-gray-400">.80</span>
            <div className="flex items-baseline gap-1 text-success">
              <Icons.arrowUpCompressed className="" />
              <span>85.66%</span>
            </div>
          </div>
          <Withdraw />
        </div>
      </div>

      {/* Graphic */}
      <div className="h-96">
        <Chart />
      </div>
    </Container>
  );
};

export default Balance;
