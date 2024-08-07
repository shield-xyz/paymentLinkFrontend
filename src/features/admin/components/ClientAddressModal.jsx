'use client';

import { ClientAddressForm } from './ClientAddressForm';

import { CustomModal } from '@/components/CustomModal';

export const ClientAddressModal = ({ clientAddress, disabled, onClose }) => {
  return (
    <CustomModal
      open={true}
      title=""
      description=""
      showCloseButton={false}
      className="flex max-w-[95vw] flex-col items-center justify-center rounded-3xl p-10 backdrop-blur-md sm:max-w-2xl"
      withBackdrop
      onClose={() => {}}
    >
      <ClientAddressForm
        clientAddress={clientAddress}
        onClose={onClose}
        disabled={disabled}
      />
    </CustomModal>
  );
};
