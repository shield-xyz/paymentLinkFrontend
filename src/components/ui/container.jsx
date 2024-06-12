import { cn } from '@/lib/utils';

const Container = ({ children, className = '', ...props }) => {
  return (
    <div
      className={cn('rounded-2xl border bg-background', className)}
      {...props}
    >
      {children}
    </div>
  );
};

export default Container;
