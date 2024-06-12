import { Nav, Sidebar } from '@/components';

export default function DashboardLayout({ children }) {
  return (
    <>
      <Nav />
      <Sidebar />
      <main className="pb-4 pl-[calc(288px+2rem)] pr-8 pt-[calc(80px+2rem)]">
        {children}
      </main>
    </>
  );
}
