'use client';

import footprint from '@onefootprint/footprint-js';
import '@onefootprint/footprint-js/dist/footprint-js.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { cn, handleSubmissionError } from '@/lib/utils';

import { postVerificationSubmittedConfirmation } from '../../actions/postVerificationSubmittedConfirmation';

const FootprintVerifyButton = ({ text, type }) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleComplete = async ({ validationToken, isKYC }) => {
    try {
      toast.info('Verification success');
      await postVerificationSubmittedConfirmation({ validationToken, isKYC });
      router.push('/verify/success');
    } catch (error) {
      handleSubmissionError(error);
      setIsSubmitting(false);
    }
  };

  const handleOpen = async () => {
    try {
      setIsSubmitting(true);

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
          console.log({ validationToken });
          handleComplete({ validationToken, isKYC: type !== 'KYB' });
        },
      });
      component.render();
    } catch (error) {
      handleSubmissionError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Button
      onClick={handleOpen}
      title="Please verify"
      className={cn('w-full')}
      isLoading={isSubmitting}
    >
      {text}
    </Button>
  );
};

export default FootprintVerifyButton;
