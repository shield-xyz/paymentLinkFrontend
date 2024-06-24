import Container from '@/components/ui/container';
import { getUser } from '@/features/auth';
import { ProfileForm } from '@/features/auth/components/profile';
import { getServerAuthSession } from '@/lib/auth';

export default async function Page() {
  const session = await getServerAuthSession();
  const userData = await getUser(session?.accessToken);

  return (
    <div>
      {!userData ? (
        <Container className="m-auto flex items-center justify-center py-24">
          <p className="text-xs tracking-tighter text-red-500">
            Error getting Profile
          </p>
        </Container>
      ) : (
        <ProfileForm session={session} userData={userData} />
      )}
    </div>
  );
}
