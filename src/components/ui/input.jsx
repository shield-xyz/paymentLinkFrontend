import * as React from 'react';

import { cn } from '@/lib/utils';

const Input = React.forwardRef(
  ({ className, type, label = undefined, labelClassName, ...props }, ref) => {
    return (
      <>
        {label && (
          <label
            className={cn(
              'block text-sm font-medium text-muted-foreground',
              labelClassName,
            )}
            htmlFor={props.id}
          >
            {label}
          </label>
        )}
        <input
          type={type}
          className={cn(
            'flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm file:border-0 file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
          ref={ref}
          {...props}
        />
      </>
    );
  },
);
Input.displayName = 'Input';

export { Input };
