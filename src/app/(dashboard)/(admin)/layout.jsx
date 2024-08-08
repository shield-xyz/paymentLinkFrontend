import Error from '@/app/error';
import { auth } from '@/lib/auth';

export const revalidate = 60;

export default async function Layout({ children }) {
  const session = await auth();

  const isAdmin = session?.user.admin;
  if (!isAdmin) {
    return <Error statusCode={401} session={session} />;
  }

  return <>{children}</>;
}
