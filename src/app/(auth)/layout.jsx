import { redirect } from 'next/navigation';

import { getServerAuthSession } from '@/lib/auth';

export default async function AuthLayout({ children }) {
  const session = await getServerAuthSession();

  console.log({ session });

  if (session && !session.isExpired) {
    redirect('/dashboard');
  }

  return <main className="h-full min-h-screen">{children}</main>;
}
