'use server';

import { env } from '@/config';
import { handleReturnError, validateResponse } from '@/lib/utils';

interface Props {
  validationToken: string;
  isKYC: boolean;
}
export async function postVerificationSubmittedConfirmation({
  validationToken,
  isKYC,
}: Props) {
  try {
    const res = await fetch(
      `${env.NEXT_PUBLIC_API_URL}/api/auth/verification-submitted-confirmation/${validationToken}?isKYC=${isKYC}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      },
    );

    const data = await validateResponse(
      res,
      'Error verification submitted confirmation email',
    );

    return { data };
  } catch (error) {
    return handleReturnError(
      error,
      'Error sending verification submitted confirmation email',
    );
  }
}
