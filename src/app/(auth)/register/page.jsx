import { RegisterForm } from '@/features/auth/';
import { auth, signIn } from '@/lib/auth';

export default async function Page({ searchParams: { validationToken } }) {
  console.log({ validationToken });
  const session = await auth();
  console.log({ session });

  async function login(validationToken) {
    'use server';
    console.log({ validationToken });
    await signIn('footprint', { validationToken });
  }

  return (
    <div className="flex h-full min-h-dvh w-screen">
      <RegisterForm validationToken={validationToken} login={login} />
    </div>
  );
}
