'use client';

import footprint from '@onefootprint/footprint-js';
import '@onefootprint/footprint-js/dist/footprint-js.css';
import { toast } from 'sonner';

import { getUserAuthToken } from '@/actions/getUserAuthToken';
import { handleSubmissionError } from '@/lib/utils';

import { Button } from './ui/button';

const CompleteVerificationButton = ({ session }) => {
  console.log({ session });
  const isVerified = session.user?.verify; //

  if (isVerified) return null;

  const handleComplete = async (validationToken) => {
    // TODO: Post to Footprint server to fetch user ID and verification status
    try {
      console.log({ validationToken });
      toast.info('Verification successful');
      // const res = await onComplete(validationToken);
      // if (res?.error) {
      //   throw new Error(res.error);
      // }
      // toast.info('To be implemented');
    } catch (error) {
      handleSubmissionError(error);
    }
  };

  const handleOpen = async () => {
    try {
      const res = await getUserAuthToken(session.accessToken);
      if (!res.status === 'success') {
        throw new Error('Something went wrong');
      }
      const { token } = res.response;

      const component = footprint.init({
        kind: 'verify',
        authToken: token,
        onComplete: (validationToken) => {
          console.log({ validationToken });
          handleComplete(validationToken);
        },
      });
      component.render();
    } catch (error) {
      handleSubmissionError(error);
    }
  };

  return (
    <Button onClick={handleOpen} title="Please verify to use the platform">
      Complete verification
    </Button>
  );
};

export default CompleteVerificationButton;
