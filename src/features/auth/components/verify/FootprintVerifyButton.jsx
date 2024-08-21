'use client';

import footprint from '@onefootprint/footprint-js';
import '@onefootprint/footprint-js/dist/footprint-js.css';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { cn, handleSubmissionError } from '@/lib/utils';

const FootprintVerifyButton = ({ text, type }) => {
  const router = useRouter();

  const handleComplete = async () => {
    try {
      toast.info('Verification success');
      router.push('/verify/success');
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
        onComplete: () => {
          handleComplete();
        },
      });
      component.render();
    } catch (error) {
      handleSubmissionError(error);
    }
  };

  return (
    <Button onClick={handleOpen} title="Please verify" className={cn('w-full')}>
      {text}
    </Button>
  );
};

export default FootprintVerifyButton;
