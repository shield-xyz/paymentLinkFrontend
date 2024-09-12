'use client';

import footprint from '@onefootprint/footprint-js';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { env } from '@/config';
import { handleSubmissionError } from '@/lib/utils';

import { onComplete } from '../../actions/onCompleteLogin';
import posthog from 'posthog-js';

import '@onefootprint/footprint-js/dist/footprint-js.css';

export const LoginFormFootPrint = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (validationToken) => {
    try {
      setIsSubmitting(true);
      const res = await onComplete(validationToken);
      if (res?.error) {
        throw new Error(res.error);
      }

      // PostHog logged user login
      posthog.capture('user_logged_in', {
        timestamp: new Date().toISOString(),
        test: 'HELLO WORLD',
      });
      console.log('SUCCESSFULLY LOG IN');
    } catch (error) {
      handleSubmissionError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpen = () => {
    const component = footprint.init({
      kind: 'auth',
      publicKey: env.NEXT_PUBLIC_FOOTPRINT_LOGIN_PB_KEY,
      onComplete: async (validationToken) => {
        handleLogin(validationToken);
      },
    });

    component.render();
    return null;
  };

  return (
    <Button
      size="lg"
      className="w-full px-14"
      onClick={handleOpen}
      isLoading={isSubmitting}
    >
      Log in
    </Button>
  );
};
