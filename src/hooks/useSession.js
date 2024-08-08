import { useEffect, useState } from 'react';

import { auth } from '@/lib/auth';

export const useSession = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      const sessionData = await auth();
      setSession(sessionData);
    };

    fetchSession();
  }, []);

  return session;
};
