import { Nav, Sidebar } from '@/components';
import { getServerAuthSession } from '@/lib/auth';

export default async function DashboardLayout({ children }) {
  const session = await getServerAuthSession();
  console.log('DashboardLayout session:', session);
  return (
    <>
      <Nav session={session} />
      <Sidebar />
      <main className="min-h-screen pt-[80px] lg:pb-8 lg:pl-[calc(320px+2rem)] lg:pr-8 lg:pt-[calc(80px+2rem)]">
        {children}
      </main>
    </>
  );
}
