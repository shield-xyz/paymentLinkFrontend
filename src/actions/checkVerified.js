'use server';

import { auth } from '@/lib/auth';

export async function checkUserVerified() {
  const session = await auth();
  if (!session.user.verify) {
    throw new Error('Please complete the verification to continue');
  }
}
