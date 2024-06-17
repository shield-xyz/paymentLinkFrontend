'use client';

import AvatarDropDown from './AvatarDropDown';
import { Icons } from './Icons';
import SearchBar from './Searchbar';

const Nav = ({ session }) => {
  return (
    <nav className="fixed z-20 flex h-[var(--nav-height)] w-full items-center border-b border-gray-200 bg-background/70 backdrop-blur-sm">
      <div className="m-auto flex h-20 w-full items-center justify-between gap-4 px-4 pr-8 lg:pl-[calc(320px+2rem)]">
        <div className="hidden lg:flex">
          <SearchBar />
        </div>
        <div className="ml-auto flex items-center gap-8">
          <div className="relative">
            <Icons.notificationFrame className="absolute right-[-2px] top-[-3px]" />
            <Icons.message className="h-6 text-gray-500" />
          </div>
          <div className="relative">
            <Icons.notificationFrame className="absolute right-[-2px] top-[-3px]" />
            <Icons.notification className="h-6 text-gray-500" />
          </div>
          <AvatarDropDown session={session} />
        </div>
      </div>
    </nav>
  );
};

export default Nav;
