'use client';

import Image from 'next/image';

import { Icons } from './Icons';
import Container from './ui/container';

const Assets = ({ balances }) => {
  console.log({ balances });

  return (
    <Container className="w-full px-5 py-6">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Assets</h3>
        <span className="flex items-center text-sm tracking-tight text-primary">
          See all <Icons.chevronRight className="h-4" />
        </span>
      </div>
      <div className="mt-8 flex flex-col gap-8">
        {balances.map((balance, index) => {
          const { asset, network } = balance;
          return (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="relative h-10 w-10">
                  <Image
                    alt={network.name}
                    src={network.logo}
                    width={40}
                    height={40}
                  />
                </div>
                <div className="ml-4">
                  <h4 className="text-sm font-medium">{network.name}</h4>
                  <span className="text-xs text-gray-400">{asset.symbol}</span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <span className="text-xs text-gray-400">
                    {!isNaN(balance.usdValue)
                      ? balance.amount * balance.usdValue
                      : 0}{' '}
                    USD
                  </span>
                  <span>
                    ${balance.amount} {asset.symbol}
                  </span>
                </div>
                <span
                  className={`text-xs ${asset.change > 0 ? 'text-green-500' : 'text-red-500'}`}
                >
                  {asset.change > 0 ? '+' : ''}
                  {asset.change}
                  {asset.change > 0 ? '%' : ''}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </Container>
  );
};

export default Assets;
