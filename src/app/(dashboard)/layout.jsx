import { Nav, Sidebar } from '@/components';

export default function DashboardLayout({ children }) {
  return (
    <>
      <Nav />
      <Sidebar />
      <main className="min-h-screen pb-8 pl-[calc(320px+2rem)] pr-8 pt-[calc(80px+2rem)]">
        {children}
      </main>
    </>
  );
}
