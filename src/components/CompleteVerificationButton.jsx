'use client';

import '@onefootprint/footprint-js/dist/footprint-js.css';
import footprint from '@onefootprint/footprint-js';
import { toast } from 'sonner';

import { handleSubmissionError } from '@/lib/utils';

import { Button } from './ui/button';

const CompleteVerificationButton = ({ session }) => {
  console.log({ session });
  const authToken = 'tok_vJK5Ze2N5fQ1GtE5V770BH8CZtQwXHF1hxowB9Nowh0'; // session.user?.authToken;
  const isVerified = false; // session.user?.verify;

  if (isVerified) return null;

  const handleComplete = async (validationToken) => {
    // TODO: Post to Footprint server to fetch user ID and verification status
    try {
      console.log({ validationToken });
      // const res = await onComplete(validationToken);
      // if (res?.error) {
      //   throw new Error(res.error);
      // }
      toast.info('To be implemented');
    } catch (error) {
      handleSubmissionError(error);
    }
  };

  const handleOpen = () => {
    const component = footprint.init({
      kind: 'auth',
      authToken: authToken,
      onComplete: (validationToken) => {
        console.log({ validationToken });
        // TODO: Post to Footprint server to fetch user ID
        handleComplete(validationToken);
      },
    });
    component.render();
  };

  return (
    <Button onClick={handleOpen} title="Please verify to use the platform">
      Complete verification
    </Button>
  );
};

export default CompleteVerificationButton;
