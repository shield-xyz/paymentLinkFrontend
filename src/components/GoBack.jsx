'use client';

import { useRouter } from 'next/navigation';

import { Icons } from './Icons';
import { Button } from './ui/button';

import { cn } from '@/lib/utils';

export const GoBack = ({ className, children }) => {
  const router = useRouter();
  const { back } = router;
  return (
    <Button
      onClick={() => back && back()}
      className={cn('flex items-center gap-2', className)}
      variant="ghost"
    >
      <Icons.chevronLeft className="h-5 w-5" />
      {children}
    </Button>
  );
};
