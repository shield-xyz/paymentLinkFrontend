'use client';

import { useState } from 'react';

import { Icons } from '@/components';
import { Button } from '@/components/ui/button';

const InfoRow = ({ label, value }) => (
  <p className="mb-2">
    <strong className="font-semibold">{label}:</strong> {value}
  </p>
);

export const BankData = ({ bankData }) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div>
      <h2 className="mb-4 mt-2 flex items-center gap-4 text-xl font-bold">
        Banking Information
        {isVisible ? (
          <Button onClick={toggleVisibility} variant="ghost" title="Hide">
            <Icons.eye className="h-5 w-5 cursor-pointer" />
          </Button>
        ) : (
          <Button onClick={toggleVisibility} variant="ghost" title="Show">
            <Icons.eyeOff className="h-5 w-5 cursor-pointer" />
          </Button>
        )}
      </h2>
      {isVisible && (
        <div>
          <InfoRow
            label="Account Beneficiary Name"
            value={bankData['custom.beneficiary_name']}
          />
          <InfoRow label="Bank Name" value={bankData['custom.bank_name']} />
          <InfoRow
            label="Account Number"
            value={bankData['custom.account_number']}
          />
          <InfoRow
            label="Routing Number"
            value={bankData['custom.routing_number']}
          />

          <div className="mt-8 flex flex-col gap-2">
            <h3 className=" text-lg font-semibold">Address</h3>
            <p className="">{bankData['custom.street_address']}</p>
            <p>{`${bankData['custom.city']}, ${bankData['custom.state']} ${bankData['custom.zip_code']}`}</p>
            <p>{bankData['custom.country']}</p>
          </div>
        </div>
      )}
    </div>
  );
};
