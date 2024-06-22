import { LoginForm } from '@/features/auth';
import { SessionExpiredModal } from '@/features/auth/components/SessionExpiredModal';

export default async function Page({ searchParams: { sessionExpired } }) {
  return (
    <div className="flex h-full min-h-dvh w-screen">
      <LoginForm />
      <SessionExpiredModal isExpired={!!sessionExpired} />
    </div>
  );
}
