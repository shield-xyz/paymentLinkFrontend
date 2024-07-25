'use client';

import VolumeChart from './VolumeChart';

import { Icons } from '@/components';
import Container from '@/components/ui/container';

export const Volume = ({ transactions }) => {
  return (
    <Container className="flex h-auto flex-col items-center justify-center p-4 xl:p-0">
      <div className="px-5 pt-5">
        <span className="mb-2 flex items-center gap-4 text-xl font-medium">
          Total Volume <Icons.chevronRight />
        </span>
      </div>

      <div className="flex h-96 w-full px-4">
        <VolumeChart transactions={transactions} />
      </div>
    </Container>
  );
};
