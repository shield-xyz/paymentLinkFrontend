'use client';

import { CustomModal } from '@/components/CustomModal';
import { useIsClient } from '@/hooks';

import { VolumeTransactionForm } from './VolumeTransactionForm';

export const EditVolumeTransactionModal = ({ transaction }) => {
  // const router = useRouter();
  const isClient = useIsClient();

  if (!isClient) return null;

  // const handleClose = () => {
  //   router.back ? router.back() : router.push('/volume');
  // };

  return (
    <CustomModal
      open={true}
      title=""
      description=""
      showCloseButton={false}
      className="flex max-w-[95vw] flex-col items-center justify-center rounded-3xl backdrop-blur-md sm:max-w-2xl sm:p-10"
      withBackdrop
      onClose={() => {}}
    >
      <VolumeTransactionForm volumeTransactionData={transaction} />
    </CustomModal>
  );
};
