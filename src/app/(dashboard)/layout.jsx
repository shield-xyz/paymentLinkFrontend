import { Nav, Sidebar } from '@/components';
import { getServerAuthSession } from '@/lib/auth';

export default async function DashboardLayout({ children }) {
  const session = await getServerAuthSession();
  return (
    <>
      <Nav session={session} />
      <Sidebar />
      <main className="min-h-screen pb-8 pl-[calc(320px+2rem)] pr-8 pt-[calc(80px+2rem)]">
        {children}
      </main>
    </>
  );
}
