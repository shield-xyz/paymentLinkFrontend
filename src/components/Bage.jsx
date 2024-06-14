import { cn } from '@/lib/utils';

const variants = {
  primary: 'bg-primary/10 text-primary-foreground',
  secondary: 'bg-secondary/10 text-secondary-foreground',
  success: 'bg-success/10 text-success',
  danger: 'bg-danger/10 text-danger-foreground',
};

const inverseVariants = {
  primary: 'bg-primary-foreground text-primary',
  secondary: 'bg-secondary-foreground text-secondary',
  success: 'bg-success text-success',
  danger: 'bg-danger-foreground text-danger',
};

export const Badge = ({ children, className, variant = 'primary' }) => {
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
