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
  const { address, contact_details } = bankData;
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
            label="Account Holder"
            value={bankData.account_holder_name}
          />
          <InfoRow label="Bank Name" value={bankData.bank_name} />
          <InfoRow label="Account Number" value={bankData.account_number} />
          <InfoRow label="Routing Number" value={bankData.routing_number} />
          <InfoRow label="Account Type" value={bankData.account_type} />

          <div className="mt-8">
            <h3 className="mb-4 text-xl font-semibold">Contact Details</h3>
            <InfoRow label="Email" value={contact_details.email} />
            <InfoRow label="Phone" value={contact_details.phone} />
          </div>

          <div className="mt-8">
            <h3 className="mb-2 text-lg font-semibold">Address</h3>
            <p className="mb-2">{address.street}</p>
            <p>{`${address.city}, ${address.state} ${address.zip_code}`}</p>
          </div>
        </div>
      )}
    </div>
  );
};
