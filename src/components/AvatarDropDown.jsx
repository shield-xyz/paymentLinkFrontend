'use client';

import Image from 'next/image';
import { signOut } from 'next-auth/react';
import { useState } from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

const AvatarDropDown = ({ session }) => {
  const [position, setPosition] = useState('bottom');

  const options = [
    {
      type: 'text',
      name: session?.user?.name || 'User',
      onClick: () => {},
    },
    {
      type: 'text',
      name: session?.user?.email || 'email@test.com',
      onClick: () => {},
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
          src="/images/Avatar.png"
          width={200}
          height={200}
          className="h-10 w-10 cursor-pointer overflow-auto rounded-full"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Shield</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          {options.map((option, index) => {
            if (option.type === 'text') {
              return (
                <DropdownMenuRadioItem key={index} value={option.name}>
                  {option.name}
                </DropdownMenuRadioItem>
              );
            } else {
              return (
                <DropdownMenuRadioItem
                  key={index}
                  value={option.name}
                  onClick={option.onClick}
                >
                  {option.name}
                </DropdownMenuRadioItem>
              );
            }
          })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AvatarDropDown;
