import Link from 'next/link';
import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

import { Icons } from './Icons';

const SidebarItem = ({ item, isAdmin, pathname, toggleSidebar }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isMenu = item.subLinks ? true : false;

  useEffect(() => {
    if (item.subLinks) {
      item.subLinks.forEach((subLink) => {
        if (pathname === subLink.path) {
          setIsOpen(true);
        }
      });
    }
  }, [pathname, item.subLinks]);

  if (item.isAdmin && !isAdmin) return null;

  const Icon = Icons[item.icon];
  const isActive = pathname === item.path;

  const LinkItem = (item) => {
    return (
      <Link
        className={cn(
          'flex cursor-pointer items-center gap-4 rounded-xl px-5 py-3 duration-300 hover:bg-gray-500/10',
          {
            'bg-gray-500/10': isActive,
            'hover:bg-gray-500/10': !isActive,
          },
        )}
        href={item.path}
        onClick={() => toggleSidebar && toggleSidebar()}
      >
        <Icon
          className={cn('h-5 w-5', {
            'text-gray-500': pathname !== item.path,
            'text-black': pathname === item.path,
          })}
        />
        {item.name}
        {isActive && <Icons.chevronRight className="ml-auto" />}
        {isMenu && isActive && <Icons.chevronDown className="ml-auto" />}
      </Link>
    );
  };

  const MenuItem = (item) => {
    return (
      <div
        className={cn(
          'flex cursor-pointer items-center gap-4 rounded-xl px-5 py-3 duration-300 ',
          {
            'hover:bg-gray-500/10': !isOpen,
          },
        )}
        onClick={() => isMenu && setIsOpen(!isOpen)}
      >
        <Icon
          className={cn('h-5 w-5', {
            'text-gray-500': pathname !== item.path,
            'text-black': pathname === item.path,
          })}
        />
        <span>{item.name}</span>

        {isOpen && <Icons.chevronRight className="ml-auto rotate-90" />}
      </div>
    );
  };

  return (
    <div
      className={cn('', {
        'rounded-lg bg-gray-400/10': isOpen,
      })}
    >
      {item.path ? LinkItem(item) : MenuItem(item)}

      {isMenu && isOpen && (
        <div className="flex flex-col gap-2 border-t pl-4">
          {item.subLinks.map((subLink, subIndex) => {
            const Icon = Icons[subLink.icon];
            const isActive = pathname === subLink.path;
            return (
              <Link
                onClick={() => toggleSidebar && toggleSidebar()}
                key={subIndex}
                href={subLink.path}
                className={cn(
                  'flex cursor-pointer items-center gap-4 rounded-xl px-5 py-3 duration-300',
                )}
              >
                {Icon && (
                  <Icon
                    className={cn('h-5 w-5', {
                      'text-gray-500': pathname !== item.path,
                      'text-black': isActive,
                    })}
                  />
                )}
                <span>{subLink.name}</span>
                {isActive && <Icons.chevronRight className="ml-auto" />}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SidebarItem;
