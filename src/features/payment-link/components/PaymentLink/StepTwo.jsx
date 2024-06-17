'use client';

import { StepIndicator } from '@/components';
import Container from '@/components/ui/container';

export const StepTwo = () => {
  return (
    <Container className="m-auto flex w-full max-w-[95vw] flex-col gap-2 rounded-lg border border-border p-4 sm:w-[450px]">
      <div className="flex items-center gap-2 text-sm">
        <StepIndicator step={1} index={0} />
        <span>Payment Method</span>
      </div>

      <span className="text-xs text-muted-foreground">
        Secure and encrypted payment
      </span>
    </Container>
  );
};
