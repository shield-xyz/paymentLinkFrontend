'use client';

import { signOut } from 'next-auth/react';
import { useCallback, useEffect, useRef } from 'react';

const MAX_INACTIVITY_MS = 300000; // 5 minutes in milliseconds

const AutoLogoutProvider = (props) => {
  const timer = useRef(setTimeout(() => {}, 0));

  // logout and redirect
  const onLogout = useCallback(async () => {
    await signOut({
      callbackUrl: '/login?sessionExpired=true',
    });
  }, []);

  // this function resets the timer on each mouse move or key press
  const onReset = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(onLogout, MAX_INACTIVITY_MS);
  }, [onLogout]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    window.addEventListener('mousemove', onReset);
    window.addEventListener('keypress', onReset);
    return () => {
      window.removeEventListener('mousemove', onReset);
      window.removeEventListener('keypress', onReset);
    };
  }, [onReset]);

  return <>{props.children}</>;
};

export default AutoLogoutProvider;
