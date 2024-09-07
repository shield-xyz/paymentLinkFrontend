'use server';

import { signIn } from '@/lib/auth';
import { handleError } from '@/lib/utils';

export async function onComplete(validationToken) {
  try {
    console.log({ validationToken });
    await signIn('footprint', { validationToken });
  } catch (error) {
    if (error) {
      if (error.message === 'NEXT_REDIRECT') {
        throw error;
      }
      console.error(error);
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credentials' };
        default:
          return { error: 'Something went wrong' };
      }
    }
    handleError(error, 'Error completing login');
  }
}
