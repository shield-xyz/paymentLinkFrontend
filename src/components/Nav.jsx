'use client';

import { useEffect } from 'react';
import { io } from 'socket.io-client';

import AvatarDropDown from './AvatarDropDown';
import { Icons } from './Icons';
import { MobileSidebar } from './MobileSidebar';

import { Notifications } from '@/features/notifications';

const Nav = ({ session, notifications }) => {
  useEffect(() => {
    if (session?.user?.id) {
      let userId = session?.user?.id;
      const socket = io('http://localhost:9000');

      // Unirse a la sala del usuario
      socket.emit('join', userId);

      // Manejar las notificaciones
      socket.on('notification', (message) => {
        console.log(message); // Puedes reemplazar esto con tu propio sistema de notificaciones
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [session?.user?.id]);

  return (
    <nav className="fixed z-20 flex h-[var(--nav-height)] w-full items-center border-b border-gray-200 bg-background/70 backdrop-blur-sm">
      <div className="ml-14 flex w-fit items-center gap-3 pl-6 lg:absolute lg:ml-0">
        <div className="flex items-center justify-center rounded-lg bg-black/5">
          <Icons.logo2 className="scale-[0.65]" />
        </div>
        <span className="font-semibold text-gray-500">SHIELD</span>
      </div>
      <MobileSidebar />
      <div className="m-auto flex h-20 w-full items-center justify-between gap-4 px-4 pr-8 lg:pl-[calc(320px+2rem)]">
        {/* <div className="hidden lg:flex">
          <Searchbar />
        </div> */}
        <div className="ml-auto flex items-center gap-8">
          <div className="relative hidden xs:flex">
            {/* <Icons.notificationFrame className="absolute right-[-2px] top-[-3px]" />
            <Icons.message className="h-6 text-gray-500" /> */}
          </div>

          <Notifications notifications={notifications} />

          <AvatarDropDown session={session} />
        </div>
      </div>
    </nav>
  );
};

export default Nav;
