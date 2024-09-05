'use client';

import '@onefootprint/footprint-js/dist/footprint-js.css';
import Link from 'next/link';

import { Button } from './ui/button';

const CompleteVerificationButton = ({ session }) => {
  const isVerified = session.user?.verify;

  if (isVerified) return null;

  return (
    <Link href="/verify">
      <Button title="Please verify to use the platform">
        Complete verification
      </Button>
    </Link>
  );
};

export default CompleteVerificationButton;
