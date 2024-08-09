import { cn } from '@/lib/utils';

import { Icons } from './Icons';
import { Input } from './ui/input';

const Searchbar = ({ placeholder = 'Search', value, onChange, className }) => {
  return (
    <div
      className={cn('flex items-center rounded-xl bg-gray-100 px-2', className)}
    >
      <Icons.search className="h-5 text-gray-500" />
      <Input
        type="text"
        placeholder={placeholder}
        className="h-9 w-full border-none bg-transparent px-2 text-sm outline-none ring-0 placeholder:text-gray-400 focus:bg-transparent focus:ring-0 focus-visible:ring-0"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Searchbar;
