'use client';

import { ErrorMessage } from '@hookform/error-message';

import { Icons, StepIndicator } from '@/components';
import { Button } from '@/components/ui/button';
import Container from '@/components/ui/container';
import { Input } from '@/components/ui/input';

export const StepThree = ({
  isLoadingPayment,
  form,
  handleVerifyPayment,
  isVerifyingPayment,
}) => {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div className="flex flex-col items-center">
      <Container className="m-auto flex w-full max-w-[95vw] flex-col gap-2 rounded-lg border border-border p-5 sm:w-[450px]">
        <div className="flex flex-col gap-2 text-sm">
          <div className="mb-4 flex items-center gap-2">
            <StepIndicator step={3} index={2} />
            <span>Verify payment</span>
          </div>
          <Input
            type="text"
            placeholder="Enter Your Payment Hash"
            {...register('paymentHash')}
          />
          <ErrorMessage
            errors={errors}
            name="paymentHash"
            render={({ message }) => (
              <span className="text-sm text-destructive">{message}</span>
            )}
          />
          <Button
            className="mt-4 w-full"
            type="button"
            size="lg"
            disabled={isLoadingPayment || isVerifyingPayment}
            onClick={handleVerifyPayment}
          >
            {isVerifyingPayment ? (
              <Icons.loaderCircle className="ml-2 h-6 w-6 animate-spin" />
            ) : (
              <span>Verify Payment</span>
            )}
          </Button>
        </div>
      </Container>
    </div>
  );
};
