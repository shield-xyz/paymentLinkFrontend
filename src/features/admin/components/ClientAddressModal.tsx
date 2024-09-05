'use client';

import { CustomModal } from '@/components/CustomModal';

import { ClientAddressForm } from './ClientAddressForm';

export const ClientAddressModal = ({
  clientAddress,
  disabled,
  onClose,
  wpGroups,
}) => {
  return (
    <CustomModal
      open={true}
      title={
        disabled
          ? 'Client Address'
          : clientAddress
            ? 'Edit Client Address'
            : 'Create Client Address'
      }
      description=""
      showCloseButton={false}
      className="flex max-w-[95vw] flex-col items-center justify-center rounded-3xl backdrop-blur-md sm:max-w-2xl sm:p-10"
      withBackdrop
      onClose={() => {}}
    >
      <ClientAddressForm
        clientAddress={clientAddress}
        onClose={onClose}
        disabled={disabled}
        wpGroups={wpGroups}
      />
    </CustomModal>
  );
};
