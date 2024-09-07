import { cn } from '@/lib/utils';

const variants = {
  primary: 'bg-success/10 text-success',
  secondary: 'bg-secondary/10 text-secondary-foreground',
  success: 'bg-success/10 text-success',
  danger: 'bg-danger/10 text-danger-foreground',
  pending: 'bg-[#FEF6EE] text-[#B93815]',
  Paused: 'bg-muted text-muted-foreground',
};

const inverseVariants = {
  primary: 'bg-success text-success',
  secondary: 'bg-secondary-foreground text-secondary',
  success: 'bg-success text-success',
  danger: 'bg-danger-foreground text-danger',
  pending: 'bg-[#B93815] text-[#FEF6EE]',
  Paused: 'bg-muted-foreground text-muted',
};

export const Badge = ({
  children,
  className,
  variant = 'primary',
}: {
  children: React.ReactNode;
  className?: string;
  variant?: keyof typeof variants;
}) => {
  const variantClasses = variants[variant] || variants.primary;
  const inverseVariantClasses =
    inverseVariants[variant] || inverseVariants.primary;
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium',
        variantClasses,
        className,
      )}
    >
      <div
        className={cn('mr-2 h-1.5 w-1.5 rounded-full', inverseVariantClasses)}
      />
      {children}
    </span>
  );
};
