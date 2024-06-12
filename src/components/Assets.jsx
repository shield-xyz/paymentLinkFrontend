import Image from 'next/image';

import { Icons } from './Icons';
import Container from './ui/container';

const Assets = () => {
  const ASSETS = [
    {
      name: 'Bitcoin',
      symbol: 'BTC',
      balance: 19.26,
      balanceUSD: 0.00179,
      change: 26.66,
      logo: '/images/Bitcoin.png',
    },
    {
      name: 'Dai',
      symbol: 'DAI',
      balance: 4.931044,
      balanceUSD: 4.99,
      change: -5.66,
      logo: '/images/Dai.png',
    },
    {
      name: 'Tether',
      symbol: 'USDT',
      balance: 5.44,
      balanceUSD: 5.44,
      change: -5.66,
      logo: '/images/Tether.png',
    },
    {
      name: 'Tether',
      symbol: 'USDT',
      balance: 5.44,
      balanceUSD: 5.44,
      change: -5.66,
      logo: '/images/Tether2.png',
    },
    {
      name: 'USD Coin',
      symbol: 'USDC',
      balance: 5.44,
      balanceUSD: 5.44,
      change: -5.66,
      logo: '/images/USD.png',
    },
  ];

  return (
    <Container className="w-full px-5 py-6">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Assets</h3>
        <span className="flex items-center text-sm tracking-tight text-primary">
          See all <Icons.chevronRight className="h-4" />
        </span>
      </div>
      <div className="mt-8 flex flex-col gap-8">
        {ASSETS.map((asset, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="relative h-10 w-10">
                <Image src={asset.logo} width={40} height={40} />
              </div>
              <div className="ml-4">
                <h4 className="text-sm font-medium">{asset.name}</h4>
                <span className="text-xs text-gray-400">{asset.symbol}</span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-2 text-sm font-medium">
                <span className="text-xs text-gray-400">
                  {asset.balanceUSD} USD
                </span>
                <span>
                  ${asset.balanceUSD} {asset.symbol}
                </span>
              </div>
              <span
                className={`text-xs ${asset.change > 0 ? 'text-green-500' : 'text-red-500'}`}
              >
                {asset.change > 0 ? '+' : ''}
                {asset.change}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Assets;
