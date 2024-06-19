import { getUser } from '@/features/auth';
import { ProfileForm } from '@/features/auth/components/profile';
import { getServerAuthSession } from '@/lib/auth';

export default async function Page() {
  const session = await getServerAuthSession();
  const userData = await getUser(session?.accessToken);

  return <ProfileForm session={session} userData={userData} />;
}
