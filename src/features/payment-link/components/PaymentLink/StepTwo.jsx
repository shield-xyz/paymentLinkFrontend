'use client';

import { Icons, StepIndicator } from '@/components';
import { Button } from '@/components/ui/button';
import Container from '@/components/ui/container';

export const StepTwo = ({
  isLoadingConnection,
  isLoadingPayment,
  tronWeb,
  connectToTron,
  handlePayment,
}) => {
  return (
    <div className="flex flex-col items-center">
      <Container className="m-auto flex w-full max-w-[95vw] flex-col gap-2 rounded-lg border border-border p-5 sm:w-[450px]">
        <div className="flex flex-col gap-2 text-sm">
          <div className="mb-4 flex items-center gap-2">
            <StepIndicator step={2} index={1} />
            <span>Payment Method</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="flex justify-between rounded-lg px-5 py-7 text-base font-semibold text-primary"
            disabled={tronWeb || isLoadingConnection}
            onClick={connectToTron}
          >
            Connect Wallet
            {isLoadingConnection ? (
              <Icons.loaderCircle className="ml-2 h-6 w-6 animate-spin" />
            ) : (
              <Icons.wallet className="ml-2 h-6 w-6" />
            )}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex justify-between rounded-lg px-5 py-7 text-base font-semibold text-primary"
            onClick={handlePayment}
            disabled={!tronWeb || isLoadingPayment}
          >
            Wallet Transfer
            {isLoadingPayment ? (
              <Icons.loaderCircle className="ml-2 h-6 w-6 animate-spin" />
            ) : (
              <Icons.send className="ml-2 h-6 w-6" />
            )}
          </Button>
        </div>
      </Container>
      <div className="mx-auto mt-2 flex items-center gap-2">
        <Icons.lock className="h-3.5 w-3.5 " />
        <span className="text-xs text-muted-foreground">
          Secure and encrypted payment
        </span>
      </div>
    </div>
  );
};
