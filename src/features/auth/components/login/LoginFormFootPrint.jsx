'use client';

import footprint from '@onefootprint/footprint-js';

import { Button } from '@/components/ui/button';
import '@onefootprint/footprint-js/dist/footprint-js.css';

export const LoginFormFootPrint = ({ onCancel, onComplete }) => {
  const handleOpen = () => {
    const component = footprint.init({
      kind: 'auth',
      publicKey: 'pb_test_OC1PnSJcbWNYLTCKAQpouc', // TODO: Replace with your .env
      onCancel,
      onComplete: async (validationToken) => {
        console.log({ validationToken });
        onComplete(validationToken);
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
