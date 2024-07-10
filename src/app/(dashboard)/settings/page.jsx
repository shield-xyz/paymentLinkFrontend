import Container from '@/components/ui/container';
import { getUser } from '@/features/auth';
import { ProfileForm } from '@/features/auth/components/profile';
import { SettingsNav } from '@/features/settings';
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
        <Container className="flex h-full w-full flex-col px-8 py-8">
          <h1 className="mb-4 text-4xl font-bold">Settings</h1>
          <p className="mb-4 text-muted-foreground">
            This is your profile editor, where you can update your information
            and personalize your account. Customize your profile by adding or
            changing your details.
          </p>
          <SettingsNav />
          <ProfileForm session={session} userData={userData} />
        </Container>
      )}
    </div>
  );
}
