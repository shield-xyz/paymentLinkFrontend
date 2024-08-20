'use client';

import footprint from '@onefootprint/footprint-js';
import '@onefootprint/footprint-js/dist/footprint-js.css';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { handleSubmissionError } from '@/lib/utils';

const FootprintVerifyButton = ({ text, type }) => {
  const handleComplete = async (validationToken) => {
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
      let publicKey = '';

      switch (type) {
        case 'KYB':
          publicKey = process.env.NEXT_PUBLIC_FOOTPRINT_KYB_PB_KEY;
          break;
        case 'KYC_US':
          publicKey = process.env.NEXT_PUBLIC_FOOTPRINT_KYC_PB_KEY;
          break;
        case 'KYC_NON_US':
          publicKey =
            process.env.NEXT_PUBLIC_FOOTPRINT_KYC_PB_KEY_NON_US_RESIDENTS;
          break;
        default:
          throw new Error('Invalid type provided');
      }

      const component = footprint.init({
        kind: 'verify',
        publicKey,
        onComplete: (validationToken) => {
          handleComplete(validationToken);
        },
      });
      component.render();
    } catch (error) {
      handleSubmissionError(error);
    }
  };

  return (
    <Button onClick={handleOpen} title="Please verify">
      {text}
    </Button>
  );
};

export default FootprintVerifyButton;
