import { Icons } from './Icons';
import Chart from './Recharts/Chart';
import Button from './ui/button';
import Container from './ui/container';

const Balance = () => {
  return (
    <Container>
      <div className="px-5 pt-5">
        <span className="mb-2 flex items-center gap-4 text-xl font-medium">
          Total Balance <Icons.chevronRight />
        </span>
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-semibold">$3,200</span>
            <span className="text-5xl font-semibold text-gray-400">.80</span>
            <div className="text-success flex items-baseline gap-1">
              <Icons.arrowUpCompressed className="" />
              <span>85.66%</span>
            </div>
          </div>
          <Button className="px-4 py-3 text-xs">Withdraw</Button>
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
