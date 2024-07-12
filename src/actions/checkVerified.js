'use server';

import { getServerAuthSession } from '@/lib/auth';

export async function checkUserVerified() {
  const session = await getServerAuthSession();
  if (!session.user.verify) {
    throw new Error('Please complete the verification to continue');
  }
}
