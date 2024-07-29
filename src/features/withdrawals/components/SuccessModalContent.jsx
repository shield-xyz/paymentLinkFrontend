import { useEffect } from 'react';

import { Icons } from '@/components';
import { Button } from '@/components/ui/button';

const SuccessModalContent = ({ handleClose }) => {
  useEffect(() => {
    // Add this Logger this after the withdraw feature is integrated
    // posthogOriginal.capture('withdrawal', {
    //   distinctId: 'user-id',
    //   amount: amount,
    //   currency: currency,
    //   timestamp: new Date().toISOString()
    // })
  }, []);

  return (
    <div>
      <Icons.successfullySent className="ml-40" />
      <div className="flex w-full flex-col items-center gap-7 px-6 pb-6">
        <p className="text-xl font-semibold">
          {/* Successfully sent to Bank account */}
          Coming soon!
        </p>
        <Button
          className="w-full font-semibold"
          onClick={handleClose}
          variant="outline"
        >
          Close
        </Button>
      </div>
    </div>
  );
};

export default SuccessModalContent;
