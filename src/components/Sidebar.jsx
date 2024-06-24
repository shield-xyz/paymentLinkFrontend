'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Icons } from './Icons';

import { SIDEBAR_PAGES } from '@/config';
import { cn } from '@/lib/utils';

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        'fixed z-30 hidden h-screen w-80 translate-x-0 flex-col gap-10 border-r border-gray-200 bg-background py-4 lg:flex',
      )}
    >
      <div className="flex w-full items-center gap-3 px-6">
        <div className="flex items-center justify-center rounded-lg bg-black/5">
          <Icons.logo className="scale-[0.65]" />
        </div>
        <span className="font-semibold text-gray-500">SHIELD</span>
      </div>
      <div className="flex flex-col gap-2 px-4">
        {SIDEBAR_PAGES.map((page, index) => {
          const Icon = Icons[page.icon];
          return (
            <Link
              className="flex items-center gap-2 rounded-xl px-5 py-3 duration-300 hover:bg-gray-500/10"
              href={page.path}
              key={index}
            >
              <Icon
                className={cn('h-5 w-5', {
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
          <Icons.help2 className="stroke-gray-300" />
          <span className="text-gray-400">Help & getting started</span>
        </div>
      </div> */}
    </div>
  );
};

export default Sidebar;
