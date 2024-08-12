'use client';

import { usePathname } from 'next/navigation';

import { SIDEBAR_PAGES } from '@/config';
import { cn } from '@/lib/utils';

import { Icons } from './Icons';
import SidebarItem from './SidebarItem';

const Sidebar = ({ session }) => {
  const pathname = usePathname();

  const isAdmin = session?.user?.admin;

  return (
    <div
      className={cn(
        'fixed z-[60] hidden h-screen w-80 translate-x-0 flex-col gap-10 border-r border-gray-200 bg-background py-4 lg:flex',
      )}
    >
      <div className="flex w-full items-center gap-3 px-6">
        <div className="flex items-center justify-center rounded-lg bg-black/5">
          <Icons.logo className="scale-[0.65]" />
        </div>
        <span className="font-semibold text-gray-500">SHIELD</span>
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
            />
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
