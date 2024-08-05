import Link from 'next/link';

import { Icons } from './Icons';
import { Button } from './ui/button';

import { copyCode } from '@/features/payment-link';

// copy: 'link' | 'hash'

export const HashLink = ({ network, hash, copy = 'hash' }) => {
  if (!hash) return null;

  const displayHash = `${hash?.slice(0, 4)}...${hash?.slice(-6)}`;
  const link = `${network?.txView}${hash}`;

  const toCopy = copy === 'link' ? link : hash;

  return (
    <div className="flex items-center gap-2">
      <Link title={hash} href={link} target="_blank">
        <span className="flex max-w-[150px] items-center gap-1 font-light">
          <span className="line-clamp-1 cursor-pointer overflow-hidden text-ellipsis break-all text-blue-400">
            {displayHash}
          </span>
        </span>
      </Link>
      <Button
        variant="ghost"
        className="px-2 py-2 font-light"
        onClick={() => copyCode(toCopy, 'Link copied to clipboard')}
      >
        <Icons.copy className="h-8 w-8 cursor-pointer rounded-md p-2" />
      </Button>
    </div>
  );
};

export const HashString = ({ hash, withCopy }) => {
  if (!hash) return null;

  const displayHash = `${hash?.slice(0, 4)}...${hash?.slice(-6)}`;

  return (
    <div className="flex items-center gap-2">
      <span className="flex max-w-[150px] items-center gap-1 font-light">
        <span
          className="line-clamp-1 cursor-pointer overflow-hidden text-ellipsis break-all text-blue-400"
          onClick={() => copyCode(hash, 'Link copied to clipboard')}
        >
          {displayHash}
        </span>
      </span>
      {withCopy && (
        <Button
          variant="ghost"
          className="px-2 py-2 font-light"
          onClick={() => copyCode(hash, 'Link copied to clipboard')}
        >
          <Icons.copy className="h-8 w-8 cursor-pointer rounded-md p-2" />
        </Button>
      )}
    </div>
  );
};
