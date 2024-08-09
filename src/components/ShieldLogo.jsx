import { cn } from '@/lib/utils';

import { Icons } from './Icons';

export const ShieldLogo = ({ className, ...props }) => {
  return (
    <div
      className={cn('flex w-full items-center gap-3 px-6', className)}
      {...props}
    >
      <div className="flex items-center justify-center rounded-lg bg-black/5">
        <Icons.logo className="scale-[0.65]" />
      </div>
      <span className="font-semibold text-gray-500">SHIELD</span>
    </div>
  );
};
