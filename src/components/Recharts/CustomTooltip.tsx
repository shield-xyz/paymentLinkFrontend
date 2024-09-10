import { cn, formatCurrency } from '@/lib/utils';

const CustomTooltip = ({
  active,
  payload,
  label,
  dateClassName,
}: {
  active: boolean;
  payload: any;
  label: string;
  dateClassName?: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg  bg-white/30 p-2 backdrop-blur-sm">
        <span
          className={cn('text-sm text-muted-foreground', dateClassName)}
        >{`${label.replaceAll('-', '/')}`}</span>
        <div>
          {payload.map((pld, index) => (
            <div className="flex gap-1" key={index}>
              <div className="text-black">
                {formatCurrency(pld.value, 2)} USD
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
