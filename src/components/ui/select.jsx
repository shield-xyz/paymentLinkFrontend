import * as Select from '@radix-ui/react-select';
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

const SelectRoot = Select.Root;
const SelectPortal = Select.Portal;
const SelectValue = Select.Value;
const SelectGroup = Select.Group;
const SelectSeparator = Select.Separator;
const SelectScrollDownButton = Select.ScrollDownButton;

const SelectTrigger = forwardRef(({ children, className, ...props }, ref) => {
  return (
    <Select.Trigger
      ref={ref}
      className={cn(
        'hover:bg-mauve-300 inline-flex h-9 items-center justify-center gap-1.5 rounded bg-white px-4 py-2 text-xs leading-none text-violet-600 shadow-[0_2px_10px_rgba(0,0,0,0.07)] focus:outline-none focus:ring-2 focus:ring-black',
        className,
      )}
      {...props}
    >
      {children}
    </Select.Trigger>
  );
});
SelectTrigger.displayName = Select.Trigger.displayName;

const SelectIcon = forwardRef(({ children, className, ...props }, ref) => {
  return (
    <Select.Icon
      ref={ref}
      className={cn('text-violet-600', className)}
      {...props}
    >
      {children}
    </Select.Icon>
  );
});
SelectIcon.displayName = Select.Icon.displayName;

const SelectContent = forwardRef(({ children, className, ...props }, ref) => {
  return (
    <Select.Content
      ref={ref}
      className={cn(
        'overflow-hidden rounded-md bg-white shadow-[0px_10px_38px_-10px_rgba(22,23,24,0.35),_0px_10px_20px_-15px_rgba(22,23,24,0.2)]',
        className,
      )}
      {...props}
    >
      {children}
    </Select.Content>
  );
});
SelectContent.displayName = Select.Content.displayName;

const SelectScrollUpButton = forwardRef(
  ({ children, className, ...props }, ref) => {
    return (
      <Select.ScrollUpButton
        ref={ref}
        className={cn(
          'flex h-6 cursor-default items-center justify-center bg-white text-violet-600',
          className,
        )}
        {...props}
      >
        {children}
      </Select.ScrollUpButton>
    );
  },
);
SelectScrollUpButton.displayName = Select.ScrollUpButton.displayName;

const SelectViewport = forwardRef(({ children, className, ...props }, ref) => {
  return (
    <Select.Viewport ref={ref} className={cn('p-1.5', className)} {...props}>
      {children}
    </Select.Viewport>
  );
});
SelectViewport.displayName = Select.Viewport.displayName;

const SelectLabel = forwardRef(({ children, className, ...props }, ref) => {
  return (
    <Select.Label
      ref={ref}
      className={cn('text-mauve-700 px-6 text-xs leading-6', className)}
      {...props}
    >
      {children}
    </Select.Label>
  );
});
SelectLabel.displayName = Select.Label.displayName;

const SelectItem = forwardRef(({ children, className, ...props }, ref) => {
  return (
    <Select.Item className={cn('', className)} {...props} ref={ref}>
      <Select.ItemText>{children}</Select.ItemText>
      <Select.ItemIndicator className="SelectItemIndicator">
        {/* <CheckIcon /> */}
      </Select.ItemIndicator>
    </Select.Item>
  );
});

export {
  SelectRoot,
  SelectTrigger,
  SelectPortal,
  SelectValue,
  SelectIcon,
  SelectContent,
  SelectScrollUpButton,
  SelectViewport,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
  SelectScrollDownButton,
  SelectItem,
};
