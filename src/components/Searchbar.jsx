import { Icons } from './Icons';
import { Input } from './ui/input';

const SearchBar = () => {
  return (
    <div className="flex items-center rounded-xl bg-gray-100 px-2">
      <Icons.search className="h-5 text-gray-500" />
      <Input
        type="text"
        placeholder="Search"
        className="w-60 border-none bg-transparent px-2 text-sm outline-none ring-0 placeholder:text-gray-400 focus:bg-transparent focus:ring-0 focus-visible:ring-0"
      />
    </div>
  );
};

export default SearchBar;
