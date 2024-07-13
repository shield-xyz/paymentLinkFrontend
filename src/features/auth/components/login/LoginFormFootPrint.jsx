'use client';

import footprint from '@onefootprint/footprint-js';
import '@onefootprint/footprint-js/dist/footprint-js.css';

export const LoginFormFootPrint = ({ onCancel, onComplete }) => {
  const handleOpen = () => {
    const component = footprint.init({
      kind: 'auth',
      publicKey: 'pb_test_OC1PnSJcbWNYLTCKAQpouc',
      onCancel,
      onComplete: (data) => {
        const { validationToken } = data;
        onComplete?.(validationToken);
      },
    });

    component.render();

    return null;
  };

  return <button onClick={handleOpen}>Launch Auth</button>;
};
