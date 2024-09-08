'use client';

import '@onefootprint/footprint-js/dist/footprint-js.css';
import Link from 'next/link';
import { Session } from 'next-auth';

import { Button } from './ui/button';

const CompleteVerificationButton = ({ session }: { session: Session }) => {
  const { isVerifySubmitted, verify } = session.user;

  if (verify) return null;

  if (isVerifySubmitted && !verify) {
    return (
      <Button title="Verification is in progress" disabled>
        Verification in progress
      </Button>
    );
  }

  return (
    <Link href="/verify">
      <Button title="Please verify to use the platform">
        Complete verification
      </Button>
    </Link>
  );
};

export default CompleteVerificationButton;
