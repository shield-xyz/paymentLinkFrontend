import Link from 'next/link';

import { Icons } from '@/components';
import { LoginForm } from '@/features/auth';

export default async function Page() {
  return (
    <div className="flex h-full min-h-dvh w-screen flex-col items-center justify-center">
      <div className="m-auto flex flex-col items-center">
        <LoginForm />
        <Link className="link mt-2 flex items-center gap-1" href="/login">
          <Icons.arrowLeft className="h-3.5 w-3.5" />
          <span>Other Login options</span>
        </Link>
      </div>
    </div>
  );
}
