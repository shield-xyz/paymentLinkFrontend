import { useEffect, useState } from 'react';

import { getServerAuthSession } from '@/lib/auth';

export const useSession = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      const sessionData = await getServerAuthSession();
      setSession(sessionData);
    };

    fetchSession();
  }, []);

  return session;
};
