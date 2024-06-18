'use client';

import { cn } from '@/lib/utils';

export const Steps = ({ steps, step }) => {
  return (
    <div className="fixed top-0 flex h-24 w-full items-center justify-center bg-muted/90 backdrop-blur-sm">
      <div className="flex items-center gap-2">
        {steps.map((s, i) => (
          <div key={i} className="flex items-center gap-2">
            <div
              className={cn(
                'flex h-5 w-5 items-center justify-center rounded-full bg-primary p-1 text-[10px]',
                {
                  'bg-primary text-primary-foreground': i + 1 <= step,
                  'bg-gray-300 text-foreground': i + 1 > step,
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
