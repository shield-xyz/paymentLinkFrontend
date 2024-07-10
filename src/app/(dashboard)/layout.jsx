import { redirect } from 'next/navigation';

import { Nav, Sidebar } from '@/components';
import { getNotifications } from '@/features/notifications';
import { getServerAuthSession } from '@/lib/auth';
import AutoLogoutProvider from '@/lib/AutoLogoutProvider';

export default async function DashboardLayout({ children }) {
  const session = await getServerAuthSession();
  const notifications = await getNotifications();

  if (session.isExpired) {
    redirect('/login?sessionExpired=true');
  }

  return (
    <AutoLogoutProvider>
      <Nav session={session} notifications={notifications} />
      <Sidebar />
      <main className="min-h-screen pt-[80px] lg:pb-8 lg:pl-[calc(320px+2rem)] lg:pr-8 lg:pt-[calc(80px+2rem)]">
        {children}
      </main>
    </AutoLogoutProvider>
  );
}
