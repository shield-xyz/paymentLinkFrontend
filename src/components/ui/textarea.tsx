import * as React from 'react';

import { cn } from '@/lib/utils';

const Textarea = React.forwardRef(
  ({ className, label = undefined, labelClassName, ...props }, ref) => {
    return (
      <>
        {label && (
          <label
            className={cn('block text-sm', labelClassName)}
            htmlFor={props.id}
          >
            {label}
          </label>
        )}
        <textarea
          className={cn(
            'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
          ref={ref}
          {...props}
        />
      </>
    );
  },
);
Textarea.displayName = 'Textarea';

export { Textarea };
