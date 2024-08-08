'use client';

import Container from '@/components/ui/container';

import VolumeChart from './VolumeChart';

export const Volume = ({ transactions }) => {
  return (
    <Container className="flex h-screen flex-col items-center justify-center border-none bg-black text-white lg:rounded-none lg:p-4">
      <div className="w-full px-10 pb-4 pt-5 text-left">
        <span className="text-left font-medium sm:text-xl">
          Transaction Volume
        </span>
      </div>

      <div className="flex h-[80dvh] w-full px-4 lg:h-[70dvh]">
        <VolumeChart transactions={transactions} />
      </div>
    </Container>
  );
};
