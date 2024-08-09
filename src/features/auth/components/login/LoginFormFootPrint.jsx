'use client';

import footprint from '@onefootprint/footprint-js';

import { Button } from '@/components/ui/button';
import { handleSubmissionError } from '@/lib/utils';

import { onComplete } from '../../actions/onCompleteLogin';

import '@onefootprint/footprint-js/dist/footprint-js.css';

export const LoginFormFootPrint = () => {
  const handleLogin = async (validationToken) => {
    try {
      const res = await onComplete(validationToken);
      if (res?.error) {
        throw new Error(res.error);
      }
    } catch (error) {
      handleSubmissionError(error);
    }
  };

  const handleOpen = () => {
    const component = footprint.init({
      kind: 'auth',
      publicKey: 'pb_test_OC1PnSJcbWNYLTCKAQpouc', // TODO: Replace with your .env
      onComplete: async (validationToken) => {
        handleLogin(validationToken);
      },
    });

    component.render();
    return null;
  };

  return (
    <Button size="lg" className="w-full px-14" onClick={handleOpen}>
      Log in
    </Button>
  );
};
