'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { SIDEBAR_PAGES } from '@/config';
import { cn } from '@/lib/utils';

import CompleteVerificationButton from './CompleteVerificationButton';
import { Icons } from './Icons';
import SidebarItem from './SidebarItem';
import { Button } from './ui/button';

export const MobileSidebar = ({ session }) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isAdmin = session?.user?.admin;

  const toggleSidebar = () => {
    setOpen(!open);
  };

  return (
    <>
      <div className="flex items-center">
        <Button className="absolute left-4" onClick={toggleSidebar}>
          <Icons.menu className="h-5 w-5" />
        </Button>
      </div>
      <div
        className={cn(
          'absolute inset-0 z-20 h-screen w-screen -translate-x-full bg-black/50',
          {
            'translate-x-0': open,
            '-translate-x-full': !open,
          },
        )}
        onClick={toggleSidebar}
      ></div>
      <div
        className={cn(
          'fixed inset-0 z-30 flex h-screen w-80 translate-x-0 flex-col gap-4 border-r border-gray-200 bg-background pb-4',
          {
            '': open,
            '-translate-x-full': !open,
          },
        )}
      >
        <div className="top-0 flex h-[var(--nav-height)] items-center gap-2 border-b border-gray-200 ">
          <Button className="absolute left-4" onClick={toggleSidebar}>
            <Icons.menu className="h-5 w-5" />
          </Button>
          <div className="ml-12 flex w-fit items-center gap-3 pl-6">
            <div className="flex items-center justify-center rounded-lg bg-black/5">
              <Icons.logo2 className="scale-[0.65]" />
            </div>
            <span className="font-semibold text-gray-500">SHIELD</span>
          </div>
        </div>

        <div className="flex flex-col gap-2 px-4">
          {SIDEBAR_PAGES.map((item, index) => {
            if (item.isAdmin && !isAdmin) return null;

            return (
              <SidebarItem
                key={index}
                item={item}
                isAdmin={isAdmin}
                pathname={pathname}
                toggleSidebar={toggleSidebar}
              />
            );
          })}
        </div>
        <div className="flex justify-center">
          <CompleteVerificationButton session={session} />
        </div>
      </div>
    </>
  );
};
