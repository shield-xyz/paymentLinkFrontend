'use client';

import Image from 'next/image';

import { CustomPagination } from '@/components';
import Container from '@/components/ui/container';
import { usePagination } from '@/hooks';
import { formatAmount, formatCurrency } from '@/lib/utils';

export const Assets = ({ balances }) => {
  const { currentData, currentPage, jump, maxPage, next, prev } = usePagination(
    balances,
    5,
  );

  return (
    <Container className="w-full px-5 py-6">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Assets</h3>
        {/* <span className="flex items-center text-sm tracking-tight text-primary">
          See all <Icons.chevronRight className="h-4" />
        </span> */}
      </div>
      <div className="mt-8 flex flex-col gap-8">
        {currentData.map((balance, index) => {
          const { asset, network } = balance;
          if (asset && network) {
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
                    <span className="text-xs text-gray-400">
                      {asset.symbol}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-3 text-sm font-medium">
                    <span className="text-xs font-normal text-gray-400">
                      {!isNaN(balance.usdValue)
                        ? formatCurrency(balance.amount * balance.usdValue, 2)
                        : 0}{' '}
                      USD
                    </span>
                    <span className="text-xs">
                      ${formatAmount(balance.amount, asset.decimals)}{' '}
                      {asset.symbol}
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
          }
        })}
      </div>
      <CustomPagination
        currentPage={currentPage}
        maxPage={maxPage}
        jump={jump}
        prev={prev}
        next={next}
        isShort
      />
    </Container>
  );
};
