import { LoginFormFootPrint, SessionExpiredModal } from '@/features/auth';
import { getServerAuthSession, signIn } from '@/lib/auth';

export default async function Page({ searchParams: { sessionExpired } }) {
  const session = await getServerAuthSession();
  async function onComplete(validationToken) {
    'use server';
    console.log({ validationToken });
    await signIn('footprint', { validationToken });
  }

  return (
    <div className="flex h-full min-h-dvh w-screen">
      {/* <LoginForm /> */}
      {session ? (
        <div>
          <h1>{JSON.stringify(session)}</h1>
        </div>
      ) : (
        <LoginFormFootPrint onComplete={onComplete} />
      )}
      <SessionExpiredModal isExpired={!!sessionExpired} />
    </div>
  );
}
