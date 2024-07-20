import { RegisterForm } from '@/features/auth/';
import { getServerAuthSession } from '@/lib/auth';

export default async function Page({ searchParams: { validationToken } }) {
  console.log({ validationToken });
  const session = await getServerAuthSession();
  console.log({ session });
  return (
    <div className="flex h-full min-h-dvh w-screen">
      <RegisterForm validationToken={validationToken} />
    </div>
  );
}
