'use client';

import { useState } from 'react';

import ErrorModalContent from './ErrorModalContent';
import SuccessModalContent from './SuccessModalContent';

import { CustomModal } from '@/components/CustomModal';
import Button from '@/components/ui/button';

const Withdraw = () => {
  const [openModal, setOpenModal] = useState(false);
  const [isError] = useState(false);

  const handleClose = () => {
    setOpenModal(false);
  };
  const handleOpen = () => {
    setOpenModal(true);
  };

  return (
    <div>
      <Button className="px-4 py-3 text-xs" onClick={handleOpen}>
        Withdraw
      </Button>
      <CustomModal
        open={openModal}
        onClose={handleClose}
        title=""
        description=""
        showCloseButton={false}
        className="flex flex-col items-center justify-center p-0"
      >
        {isError ? (
          <ErrorModalContent handleClose={handleClose} />
        ) : (
          <SuccessModalContent handleClose={handleClose} />
        )}
      </CustomModal>
    </div>
  );
};

export default Withdraw;
