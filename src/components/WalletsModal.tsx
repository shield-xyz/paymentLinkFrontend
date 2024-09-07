'use client';

import { CustomModal } from '@/components/CustomModal';

import { HashString } from './Hash';

interface Props {
  wallets: string[];
  onClose: () => void;
  title: string;
  description?: string;
}

export const WalletsModal = ({
  wallets,
  onClose,
  title,
  description,
}: Props) => {
  return (
    <CustomModal
      open={true}
      title={title}
      description={description}
      showCloseButton={false}
      className="flex max-w-[95vw] flex-col items-center justify-center rounded-3xl backdrop-blur-md sm:max-w-2xl sm:px-4 sm:py-10"
      withBackdrop
      onClose={onClose}
    >
      <div className="flex max-h-[50vh] w-full flex-col overflow-auto px-4 sm:px-6">
        <div className="flex w-full flex-col gap-2">
          {wallets.map((wallet, index) => (
            <div className="flex w-full items-center gap-2" key={wallet}>
              <span className="min-w-fit text-xs">{index + 1}</span>
              <span className="line-clamp-1 flex w-full items-center gap-2 text-ellipsis rounded-lg border px-4 py-1 text-xs">
                <HashString hash={wallet} withCopy showFullString />
              </span>
            </div>
          ))}
        </div>
      </div>
    </CustomModal>
  );
};
