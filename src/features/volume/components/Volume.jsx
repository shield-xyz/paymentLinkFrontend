'use client';

import VolumeChart from './VolumeChart';

import { Icons } from '@/components';
import Container from '@/components/ui/container';

export const Volume = ({ transactions }) => {
  console.log({ transactions });

  return (
    <Container className="h-full min-h-screen p-4 sm:min-h-[calc(100vh-var(--nav-height)-4rem)] xl:p-0">
      <div className="px-5 pt-5">
        <span className="mb-2 flex items-center gap-4 text-xl font-medium">
          Total Volume <Icons.chevronRight />
        </span>
      </div>

      <div className="h-96 px-4">
        {/* <Chart transactions={transactions} data={data} />  */}
        <VolumeChart transactions={transactions} />
      </div>
    </Container>
  );
};
