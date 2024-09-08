import { cn } from '@/lib/utils';

export const StepIndicator = ({ step, index }) => {
  return (
    <div
      className={cn(
        'flex h-5 w-5 items-center justify-center rounded-full p-1 text-[10px]',
        {
          'bg-primary text-primary-foreground': index + 1 <= step,
          'bg-gray-300 text-foreground': index + 1 > step,
        },
      )}
    >
      {index + 1}
    </div>
  );
};
