import { Icons } from '@/components';
import { LoginFormFootPrint, SessionExpiredModal } from '@/features/auth';

export default async function Page({ searchParams: { sessionExpired } }) {
  return (
    <div className="flex h-full min-h-dvh w-screen flex-col items-center justify-center">
      <div className="m-auto flex flex-col items-center gap-4">
        <div className="mb-4 flex items-center gap-4">
          <h1 className="text-4xl font-bold">Log in to Shield</h1>
          <Icons.logo />
        </div>
        <LoginFormFootPrint />
      </div>
      <SessionExpiredModal isExpired={!!sessionExpired} />
    </div>
  );
}
