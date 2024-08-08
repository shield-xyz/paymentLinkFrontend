import { redirect } from 'next/navigation';

import { auth } from '@/lib/auth';

export default async function AuthLayout({ children }) {
  const session = await auth();

  console.log({ session });

  if (session && !session.isExpired) {
    redirect('/payment-links');
  }

  return <main className="h-full min-h-screen">{children}</main>;
}
