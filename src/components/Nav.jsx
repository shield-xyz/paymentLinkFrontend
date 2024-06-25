'use client';

import AvatarDropDown from './AvatarDropDown';
import { Icons } from './Icons';
import { MobileSidebar } from './MobileSidebar';
import Searchbar from './Searchbar';

const Nav = ({ session }) => {
  return (
    <nav className="fixed z-20 flex h-[var(--nav-height)] w-full items-center border-b border-gray-200 bg-background/70 backdrop-blur-sm">
      <div className="ml-14 flex w-fit items-center gap-3 pl-6 lg:absolute lg:ml-0">
        <div className="flex items-center justify-center rounded-lg bg-black/5">
          <Icons.logo2 className="" />
        </div>
        <span className="font-semibold text-gray-500">SHIELD</span>
      </div>
      <MobileSidebar />
      <div className="m-auto flex h-20 w-full items-center justify-between gap-4 px-4 pr-8 lg:pl-[calc(320px+2rem)]">
        <div className="hidden lg:flex">
          <Searchbar />
        </div>
        <div className="ml-auto flex items-center gap-8">
          <div className="relative hidden xs:flex">
            {/* <Icons.notificationFrame className="absolute right-[-2px] top-[-3px]" />
            <Icons.message className="h-6 text-gray-500" /> */}
          </div>
          <div className="relative hidden xs:flex">
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
