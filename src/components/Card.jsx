import { cn } from '@/lib/utils';

export const Card = ({
  type = 'light',
  header,
  children,
  footer,
  className,
}) => {
  return (
    <div
      className={cn(
        'relative flex flex-col overflow-hidden rounded-lg border',
        {
          'bg-white': type === 'light',
          'bg-gray-800 text-white': type === 'dark',
        },
      )}
    >
      {header && <div className="border-b px-4 py-2">{header}</div>}
      <div className={cn('flex-1 p-2 font-medium', className)}>{children}</div>
      {footer && <div className="border-t px-4 py-2">{footer}</div>}
    </div>
  );
};
