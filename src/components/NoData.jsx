import { Icons } from './Icons';

export const NoData = ({ text = 'No data available' }) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center py-14">
      <div className="flex flex-col items-center justify-center gap-1">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border bg-muted p-2">
          <Icons.packageOpen className="text-gray-400" />
        </div>
        <span className="text-sm text-gray-400">{text}</span>
      </div>
    </div>
  );
};
