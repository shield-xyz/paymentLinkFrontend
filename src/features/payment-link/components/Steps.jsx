'use client';

import { usePaymentLink } from '../hooks';

import { cn } from '@/lib/utils';

export const Steps = () => {
  const { steps, step } = usePaymentLink();
  return (
    <div className="flex h-24 items-center justify-center bg-gray-100">
      <div className="flex items-center gap-2">
        {steps.map((s, i) => (
          <div key={i} className="flex items-center gap-2">
            <div
              className={cn(
                'flex h-5 w-5 items-center justify-center rounded-full bg-primary p-1 text-[10px]',
                {
                  'bg-primary text-primary-foreground': i <= step,
                  'bg-gray-300 text-foreground': i > step,
                },
              )}
            >
              {i + 1}
            </div>
            <div className="text-xs">{s.title}</div>
            {i % 2 === 0 && i !== steps.length - 1 && (
              <div className="h-[1px] w-7 bg-foreground" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
