'use client';

import { useRouter } from 'next/navigation';

import { copyCode } from '../../utils';

import { Icons } from '@/components';
import { Button } from '@/components/ui/button';
import Container from '@/components/ui/container';

export const StepTwo = ({ link }) => {
  const router = useRouter();

  const handleContinue = async () => {
    router.push('/payment-links');
  };

  return (
    <Container className="m-auto flex w-96 max-w-[95vw] flex-col gap-2 rounded-lg border border-border p-5 sm:w-[450px]">
      <h1 className="mb-4 text-center text-2xl font-semibold">
        You're all set
      </h1>
      <span className="mb-4 text-center text-sm font-light tracking-tight text-muted-foreground">
        You can start accepting payments for this product
      </span>
      <div>
        <div className="flex flex-col rounded-md bg-muted p-4">
          <div className="flex items-center gap-2">
            <Icons.shareLink className="h-6 w-6" />
            <span className="text-muted-foreground">Share payment link</span>
          </div>
          <div
            className="group mt-4 flex h-12 w-full items-center rounded-md border bg-background px-4"
            onClick={() => copyCode(link, 'Link copied to clipboard')}
          >
            <span className="line-clamp-1 w-full cursor-pointer overflow-hidden text-ellipsis break-all text-blue-400">
              {link}
            </span>
            <Icons.copy className="h-10 w-10 cursor-pointer rounded-md p-2 hover:bg-muted" />
          </div>
          <span className="mt-4 text-center text-sm font-light tracking-tight text-muted-foreground">
            Share a link to our pre-built checkout page
          </span>
        </div>
      </div>

      <Button
        type="button"
        variant="default"
        className="mt-4 font-semibold"
        onClick={handleContinue}
        size="lg"
      >
        Continue
      </Button>
    </Container>
  );
};
