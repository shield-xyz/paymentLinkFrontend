'use client';

import confetti from 'canvas-confetti';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

import { Button } from '@/components/ui/button';

import { useStore } from '../store';

export const SuccessForm = () => {
  const { setSuccess } = useStore();

  useEffect(() => {
    const width = window.screen.width;

    // const isMobile = width <= 640
    const isTablet = width > 640 && width <= 768;
    const isLaptop = width > 768 && width <= 1024;
    const isLaptopL = width > 1024 && width <= 1440;
    const is4K = width > 1440;

    if (width) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: is4K
          ? { x: 0.6, y: 0.2 }
          : isLaptopL
            ? { x: 0.7, y: 0.4 }
            : isLaptop
              ? { x: 0.8, y: 0.45 }
              : isTablet
                ? { x: 0.6, y: 0.5 }
                : { x: 0.5, y: 0.8 },
      });
    }
  }, []);

  return (
    <div className="rounded-2xl border p-8">
      <div className="text-black/30">Payment Successful</div>
      <Image
        width={100}
        height={100}
        className="mx-auto mt-8"
        src={'/images/Icon_Transaction.svg'}
        alt="Transaction Icon"
      />
      <div className="mt-4 text-black/30">
        We will notify you once the transaction is confirmed.
      </div>
      <Link href="/dashboard" onClick={() => setSuccess(false)}>
        <Button className="mt-4 w-full font-medium">Confirm</Button>
      </Link>
    </div>
  );
};
