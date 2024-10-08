import { cn } from '@/lib/utils';

const Steps = ({ step, setStep }) => {
  const OPTIONS = [
    {
      title: 'Your details',
      description: 'Please provide your name and company details',
    },
  ];
  return (
    <div className="flex w-full items-center justify-center gap-4 px-6 pb-6">
      {OPTIONS.map((option, index) => (
        <div
          key={index}
          className="flex h-full w-full cursor-pointer flex-col"
          onClick={() => {
            if (index < step) setStep(index + 1);
          }}
        >
          <div className="flex flex-col items-center gap-2">
            <div
              className={`flex h-1 w-full items-center justify-center rounded-full ${
                index < step ? 'bg-primary' : 'bg-border'
              }`}
            ></div>
            <div
              className={`flex w-full flex-col pt-1 ${
                index < step ? 'text-primary' : ''
              }`}
            >
              <span
                className={cn('text-sm font-medium text-gray-700', {
                  'text-primary': index < step,
                })}
              >
                {option.title}
              </span>
              <span
                className={cn('text-xs text-muted-foreground', {
                  'text-primary/80': index < step,
                })}
              >
                {option.description}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Steps;
