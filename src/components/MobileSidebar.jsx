'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { Icons } from './Icons';
import { Button } from './ui/button';

import { SIDEBAR_PAGES } from '@/config';
import { cn } from '@/lib/utils';

export const MobileSidebar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const toggleSidebar = () => {
    setOpen(!open);
  };

  return (
    <>
      <div className="flex items-center">
        <Button
          className="absolute left-4"
          variant="icon"
          onClick={toggleSidebar}
        >
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
          <Button
            className="absolute left-4"
            variant="icon"
            onClick={toggleSidebar}
          >
            <Icons.menu className="h-5 w-5" />
          </Button>
          <div className="ml-14 flex w-fit items-center gap-3 pl-6 lg:ml-0">
            <div className="flex items-center justify-center rounded-lg bg-black/5">
              <Icons.logo2 className="scale-[0.65]" />
            </div>
            <span className="font-semibold text-gray-500">SHIELD</span>
          </div>
        </div>

        <div className="flex flex-col gap-2 px-4">
          {SIDEBAR_PAGES.map((page, index) => {
            const Icon = Icons[page.icon];
            return (
              <Link
                className="flex items-center gap-2 rounded-xl px-5 py-3 text-sm duration-300 hover:bg-gray-500/10"
                href={page.path}
                key={index}
                onClick={toggleSidebar}
              >
                <Icon
                  className={cn('h-4 w-4', {
                    'text-gray-500': pathname !== page.path,
                    'text-black': pathname === page.path,
                  })}
                />
                <span
                  className={cn('', {
                    'text-gray-500': pathname !== page.path,
                    'text-black': pathname === page.path,
                  })}
                >
                  {page.name}
                </span>
                {pathname === page.path && (
                  <Icons.chevronRight
                    className={cn('ml-auto', {
                      'text-gray-500': pathname !== page.path,
                      'text-black': pathname === page.path,
                    })}
                  />
                )}
              </Link>
            );
          })}
        </div>
        {/* <div className="mt-auto px-8">
          <div className="flex w-full items-center gap-2 border-t border-gray-200 py-4">
            <Icons.help2 className="h-5 w-5 stroke-gray-300" />
            <span className="text-sm text-gray-400">
              Help & getting started
            </span>
          </div>
        </div> */}
      </div>
    </>
  );
};
