'use client';

import Image from 'next/image';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { useState } from 'react';

import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

import { cn } from '@/lib/utils';

const AvatarDropDown = ({ session }) => {
  const [position, setPosition] = useState('bottom');
  console.log('AvatarDropDown -> session', session);

  const options = [
    {
      type: 'link',
      name: 'View Profile',
      path: '/profile',
    },
    {
      type: 'link',
      name: 'Settings',
      path: '/settings',
    },
    {
      type: 'link',
      name: 'Support',
      path: '/support',
    },
    {
      type: 'button',
      name: 'Logout',
      onClick: () => signOut(),
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Image
          alt="Avatar"
          src={`${session?.user?.logo || ''}?v=${Date.now()}`} // timestamp to force refresh on update
          width={200}
          height={200}
          className="h-10 w-10 cursor-pointer overflow-auto rounded-full border border-input"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 rounded-xl">
        <DropdownMenuLabel className="flex items-center gap-2">
          <Image
            alt="Avatar"
            src={`${session?.user?.logo || ''}?v=${Date.now()}`} // timestamp to force refresh on update
            width={200}
            height={200}
            className="h-10 w-10 cursor-pointer overflow-auto rounded-full border border-input"
          />
          <div className="flex flex-col">
            <span className="text-sm font-semibold">
              {session?.user?.name || 'User'}
            </span>
            <span className="text-xs font-light text-muted-foreground">
              {session?.user?.email || ''}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          {options.map((option, index) => {
            if (option.type === 'button') {
              return (
                <DropdownMenuRadioItem
                  className="py-0"
                  key={index}
                  value={option.name}
                >
                  <Button
                    variant="ghost"
                    className="p-0"
                    onClick={option.onClick}
                  >
                    {option.name}
                  </Button>
                </DropdownMenuRadioItem>
              );
            } else if (option.type === 'link') {
              return (
                <span key={index}>
                  <Link href={option.path} className={cn('', {})}>
                    <DropdownMenuRadioItem
                      value={option.name}
                      onClick={option.onClick}
                    >
                      {option.name}
                    </DropdownMenuRadioItem>
                  </Link>
                  <DropdownMenuSeparator />
                </span>
              );
            }
          })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AvatarDropDown;
