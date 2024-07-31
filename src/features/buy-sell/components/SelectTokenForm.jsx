'use client';

import Image from 'next/image';
import { useState } from 'react';

import { Button } from '@/components/ui/button';

export const SelectTokenForm = ({ handleChangeStep }) => {
  const [selectedToken, setSelectedToken] = useState('');

  const TOKENS = [
    {
      name: 'Bitcoin',
      icon: '/images/Bitcoin.png',
    },
    {
      name: 'Ethereum',
      icon: '/images/Ethereum.png',
    },
    {
      name: 'Tether',
      icon: '/images/Tether2.png',
    },
    {
      name: 'USD Coin',
      icon: '/images/USD.png',
    },
  ];

  const handleSelectToken = (name) => {
    setSelectedToken(name);
  };

  return (
    <div className="max-w-lg rounded-2xl border p-8">
      <div className="text-black/30">Select the token you'd like to sell</div>
      <div className="mt-8 flex flex-wrap gap-4">
        {TOKENS.map((token) => (
          <Button
            onClick={() => handleSelectToken(token.name)}
            variant={selectedToken === token.name ? 'default' : 'secondary'}
            className={`space-x-2 px-4 font-medium ${selectedToken === token.name ? 'text-white' : 'text-[#6C7275]'}`}
            size="sm"
          >
            <Image
              width={20}
              height={20}
              className="h-auto w-4"
              src={token.icon}
              alt={`${token.name} Image`}
            />
            <div>{token.name}</div>
          </Button>
        ))}
      </div>

      <Button
        onClick={handleChangeStep}
        variant="default"
        className="mt-8 w-full font-medium"
        size="sm"
      >
        Continue
      </Button>
    </div>
  );
};
