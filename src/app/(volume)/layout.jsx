import Error from '../error';

import { getServerAuthSession } from '@/lib/auth';

export default async function Layout({ children }) {
  const session = await getServerAuthSession();

  // const isAdmin = session?.user.admin;
  const isAdmin = true;
  if (!isAdmin) {
    return <Error statusCode={401} session={session} />;
  }

  return (
    <html className="bg-background">
      <body>{children}</body>
    </html>
  );
}
