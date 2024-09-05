'use client';

import { useState } from 'react';

import { Icons } from '@/components';
import { CustomModal } from '@/components/CustomModal';
import { Button } from '@/components/ui/button';
import { useIsClient } from '@/hooks';

export const SessionExpiredModal = ({ isExpired }) => {
  const [openModal, setOpenModal] = useState(isExpired);
  const isClient = useIsClient();

  const handleClose = () => {
    setOpenModal(false);
  };

  if (!isClient) return null;

  return (
    <CustomModal
      open={openModal}
      onClose={handleClose}
      title=""
      description=""
      showCloseButton={false}
      className="flex max-w-[95vw] flex-col items-center justify-center rounded-3xl p-6 backdrop-blur-md sm:max-w-sm"
      withBackdrop
    >
      <div className="text-center">
        <Icons.logo className="m-auto mb-6 h-12 w-12" />
        <p>Session expired due to inactivity</p>
        <p>Please log in again</p>
      </div>
      <Button className="mt-2 focus-visible:ring-0" onClick={handleClose}>
        Continue
      </Button>
    </CustomModal>
  );
};
