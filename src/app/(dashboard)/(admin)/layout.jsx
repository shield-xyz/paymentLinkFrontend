import Error from '@/app/error';
import { getServerAuthSession } from '@/lib/auth';

export const revalidate = 60;

export default async function Layout({ children }) {
  const session = await getServerAuthSession();

  const isAdmin = session?.user.admin;
  if (!isAdmin) {
    return <Error statusCode={401} session={session} />;
  }

  return <>{children}</>;
}
