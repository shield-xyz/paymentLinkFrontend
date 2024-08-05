'use client';

import { VolumeTransactionForm } from './VolumeTransactionForm';

import { CustomModal } from '@/components/CustomModal';
import { useIsClient } from '@/hooks';

export const CreateVolumeTransactionModal = () => {
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
      className="flex max-w-[95vw] flex-col items-center justify-center rounded-3xl p-6 backdrop-blur-md sm:max-w-2xl"
      withBackdrop
      onClose={() => {}}
    >
      <VolumeTransactionForm />
    </CustomModal>
  );
};
