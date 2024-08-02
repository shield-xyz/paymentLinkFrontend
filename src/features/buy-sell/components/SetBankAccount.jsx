'use client';

import { useStore } from '../store';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const SetBankAccount = ({ handleChangeStep }) => {
  const {
    bankName,
    accountNumber,
    routingNumber,
    beneficiaryName,
    country,
    state,
    city,
    streetAddress,
    zipCode,
    setBankName,
    setAccountNumber,
    setRoutingNumber,
    setBeneficiaryName,
    setCountry,
    setState,
    setCity,
    setStreetAddress,
    setZipCode,
  } = useStore();

  return (
    <div className="max-w-lg rounded-2xl border p-8">
      <div className="mb-4 min-w-[400px] text-black/30">
        Set the bank account for the wire
      </div>
      <Input
        label="Beneficiary Name"
        value={beneficiaryName}
        onChange={(e) => setBeneficiaryName(e.target.value)}
        className="mb-4"
      />
      <div className="mb-4 flex flex-row space-x-2">
        <div>
          <span className="text-sm">Account Number</span>
          <Input
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
          />
        </div>
        <div>
          <span className="text-sm">Routing Number</span>
          <Input
            value={routingNumber}
            onChange={(e) => setRoutingNumber(e.target.value)}
          />
        </div>
      </div>
      <Input
        label="Bank Name"
        value={bankName}
        onChange={(e) => setBankName(e.target.value)}
        className="mb-4"
      />
      <div className="mb-4 flex flex-row space-x-2">
        <div>
          <span className="text-sm">Country</span>
          <Input value={country} onChange={(e) => setCountry(e.target.value)} />
        </div>
        <div>
          <span className="text-sm">State</span>
          <Input value={state} onChange={(e) => setState(e.target.value)} />
        </div>
      </div>
      <div className="mb-4 flex flex-row space-x-2">
        <div>
          <span className="text-sm">City</span>
          <Input value={city} onChange={(e) => setCity(e.target.value)} />
        </div>
        <div>
          <span className="text-sm">Zip Code</span>
          <Input value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
        </div>
      </div>
      <Input
        label="Street Address"
        value={streetAddress}
        onChange={(e) => setStreetAddress(e.target.value)}
        className="mb-4"
      />
      <Button
        onClick={handleChangeStep}
        variant="default"
        className="mt-4 w-full font-medium"
        size="sm"
        disabled={
          !beneficiaryName ||
          !accountNumber ||
          !routingNumber ||
          !bankName ||
          !country ||
          !state ||
          !city ||
          !streetAddress ||
          !zipCode
        }
      >
        Continue
      </Button>
    </div>
  );
};
