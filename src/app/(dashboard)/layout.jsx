import { redirect } from 'next/navigation';

import { Nav, Sidebar } from '@/components';
import { getServerAuthSession } from '@/lib/auth';
import AutoLogoutProvider from '@/lib/AutoLogoutProvider';

// const KYCVerification = dynamic(
//   () => import('../../features/onboarding/components/KYCVerification'),
//   {
//     loading: () => (
//       <div className="fixed inset-0 z-[100] h-screen w-screen bg-white"></div>
//     ),
//   },
// );

export default async function DashboardLayout({ children }) {
  const session = await getServerAuthSession();

  if (session.isExpired) {
    redirect('/login?sessionExpired=true');
  }

  // if user didn't complete the KYC verification, show it.

  return (
    <AutoLogoutProvider>
      <Nav session={session} />
      <Sidebar />
      {/* <KYCVerification isVerified={false} /> */}
      <main className="min-h-screen pt-[80px] lg:pb-8 lg:pl-[calc(320px+2rem)] lg:pr-8 lg:pt-[calc(80px+2rem)]">
        {children}
      </main>
    </AutoLogoutProvider>
  );
}
