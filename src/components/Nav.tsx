import { Notifications } from '@/features/notifications';

import AvatarDropDown from './AvatarDropDown';
import CompleteVerificationButton from './CompleteVerificationButton';
import { Icons } from './Icons';
import { MobileSidebar } from './MobileSidebar';

interface Props {
  session: any;
  notifications?: any;
}

const Nav: React.FC<Props> = ({ session, notifications }) => {
  return (
    <nav className="fixed z-50 flex h-[var(--nav-height)] w-full items-center border-b border-gray-200 bg-background/90 backdrop-blur-sm">
      <div className="ml-12 flex w-fit items-center gap-3 pl-6 lg:absolute lg:ml-0">
        <div className="flex items-center justify-center rounded-lg bg-black/5">
          <Icons.logo2 className="scale-[0.65]" />
        </div>
        <span className="font-semibold text-gray-500">SHIELD</span>
      </div>
      <MobileSidebar session={session} />
      <div className="m-auto flex h-20 w-full items-center justify-between gap-4 px-4 pr-8 lg:pl-[calc(320px+2rem)]">
        <div className="hidden sm:flex">
          <CompleteVerificationButton session={session} />
        </div>
        <div className="ml-auto flex items-center gap-8">
          <Notifications notifications={notifications} session={session} />
          <AvatarDropDown session={session} />
        </div>
      </div>
    </nav>
  );
};

export default Nav;
