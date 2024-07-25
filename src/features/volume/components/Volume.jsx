'use client';

import VolumeChart from './VolumeChart';

import Container from '@/components/ui/container';

export const Volume = ({ transactions }) => {
  return (
    <Container className="flex h-auto flex-col items-center justify-center border-none bg-black p-4 text-white lg:rounded-none xl:p-0">
      <div className="w-full px-10 pb-4 pt-5 text-left">
        <span className="text-left font-medium sm:text-xl">
          Post-compliance transaction volume
        </span>
      </div>

      <div className="flex h-96 w-full px-4">
        <VolumeChart transactions={transactions} />
      </div>
    </Container>
  );
};
