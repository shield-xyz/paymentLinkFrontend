'use client';

import confetti from 'canvas-confetti';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

import { Button } from '@/components/ui/button';

export const SuccessForm = () => {
  useEffect(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: 0.7, y: 0.6 },
    });
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
      <Link href="/dashboard">
        <Button className="mt-4 w-full font-medium">Confirm</Button>
      </Link>
    </div>
  );
};
