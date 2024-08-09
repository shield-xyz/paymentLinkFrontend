'use client';

import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { useStore } from '../store';

export const SelectTokenForm = ({ handleChangeStep, networks, assets }) => {
  const {
    side,
    selectedNetwork,
    selectedAsset,
    amount,
    clientDepositAddress,
    setAsset,
    setAmount,
    setNetwork,
    setClientDepositAddress,
  } = useStore();

  return (
    <div className="max-w-lg rounded-2xl border p-8">
      <div className="text-black/30">
        Select the network you&apos;d like to use
      </div>
      <div className="mt-4 flex flex-wrap gap-4">
        {networks.map((network, index) => (
          <Button
            key={index}
            onClick={() => setNetwork(network)}
            variant={
              selectedNetwork && selectedNetwork.name === network.name
                ? 'default'
                : 'secondary'
            }
            className={`space-x-2 px-4 font-medium ${selectedNetwork && selectedNetwork.name === network.name ? 'text-white' : 'text-[#6C7275]'}`}
            size="sm"
          >
            <Image
              width={20}
              height={20}
              className="h-auto w-4"
              src={network.logo}
              alt={`${network.name} Image`}
            />
            <div>{network.name}</div>
          </Button>
        ))}
      </div>
      <div className="mt-8 text-black/30">
        Select the token you&apos;d like to {side}
      </div>
      <div className="mt-4 flex flex-wrap gap-4">
        {selectedAsset &&
          selectedNetwork &&
          assets
            .filter((asset) => asset.networkId === selectedNetwork.networkId)
            .map((asset) => (
              <Button
                key={asset.assetId}
                onClick={() => setAsset(asset)}
                variant={
                  selectedAsset && selectedAsset.name === asset.name
                    ? 'default'
                    : 'secondary'
                }
                className={`space-x-2 px-4 font-medium ${selectedAsset && selectedAsset.name === asset.name ? 'text-white' : 'text-[#6C7275]'}`}
                size="sm"
              >
                <Image
                  width={20}
                  height={20}
                  className="h-auto w-4"
                  src={asset.logo}
                  alt={`${asset.name} Image`}
                />
                <div>{asset.name}</div>
              </Button>
            ))}
      </div>
      <div className="mt-8 text-black/30">
        Select the amount you&apos;d like to {side}
      </div>
      <div className="mt-4 flex items-center justify-center space-x-2">
        <Input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="number"
        />
        <span className="whitespace-nowrap text-black/80">
          {selectedAsset ? selectedAsset.symbol : ''}
        </span>
      </div>
      {side === 'buy' && (
        <>
          <div className="mt-8 text-black/30">Enter your deposit address</div>
          <Input
            className="mt-4"
            value={clientDepositAddress}
            onChange={(e) => setClientDepositAddress(e.target.value)}
          />
        </>
      )}
      <Button
        onClick={handleChangeStep}
        variant="default"
        className="mt-8 w-full font-medium"
        size="sm"
        disabled={
          !selectedAsset ||
          amount <= 0 ||
          (side === 'buy' && !clientDepositAddress)
        }
      >
        Continue
      </Button>
    </div>
  );
};
