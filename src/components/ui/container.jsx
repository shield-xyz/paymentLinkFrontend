import { cn } from '@/lib/utils';

const Container = ({ children, className = '', ...props }) => {
  return (
    <div
      className={cn(
        'rounded-none border bg-background lg:rounded-2xl',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Container;
