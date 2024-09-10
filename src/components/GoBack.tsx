'use client';

import { useRouter } from 'next/navigation';

import { cn } from '@/lib/utils';

import { Icons } from './Icons';
import { Button } from './ui/button';

export const GoBack = ({
  className,
  children,
  onClick,
  ...props
}: {
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}) => {
  const router = useRouter();
  const { back } = router;
  return (
    <Button
      onClick={() => (onClick ? onClick() : back ? back() : null)}
      className={cn('flex items-center gap-2', className)}
      variant="ghost"
      type="button"
      {...props}
    >
      <Icons.chevronLeft className="h-5 w-5" />
      {children}
    </Button>
  );
};
