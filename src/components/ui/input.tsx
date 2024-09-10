import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelClassName?: string;
  isPercentage?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      label = undefined,
      labelClassName,
      isPercentage,
      ...props
    },
    ref,
  ) => {
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
        <div className="relative">
          <input
            type={type}
            className={cn(
              'flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm file:border-0 file:text-sm file:font-medium placeholder:text-muted-foreground/50 disabled:cursor-not-allowed disabled:opacity-50',
              className,
            )}
            ref={ref}
            {...props}
          />
          {isPercentage && (
            <span className="absolute right-8 top-1/2 translate-y-[-50%] text-xs text-muted-foreground">
              %
            </span>
          )}
        </div>
      </>
    );
  },
);
Input.displayName = 'Input';

export { Input };
