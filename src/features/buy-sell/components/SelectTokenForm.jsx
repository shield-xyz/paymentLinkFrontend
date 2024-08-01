'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import { useStore } from '../store';

import { getAssets } from '@/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getNetworks } from '@/features/payment-link';

export const SelectTokenForm = ({ handleChangeStep }) => {
  const {
    selectedNetwork,
    selectedAsset,
    amount,
    setNetwork,
    setAsset,
    setAmount,
  } = useStore();

  const [networks, setNetworks] = useState([]);
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    getNetworks().then((networks) => {
      setNetworks(networks);
      setNetwork(networks[0]);
    });
    getAssets().then(setAssets);
  }, []);

  useEffect(() => {
    setAsset(
      assets.find((asset) => asset.networkId === selectedNetwork.networkId),
    );
  }, [selectedNetwork]);

  return (
    <div className="max-w-lg rounded-2xl border p-8">
      <div className="text-black/30">Select the network you'd like to use</div>
      <div className="mt-4 flex flex-wrap gap-4">
        {networks.map((network) => (
          <Button
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
        Select the token you'd like to sell
      </div>
      <div className="mt-4 flex flex-wrap gap-4">
        {selectedAsset &&
          selectedNetwork &&
          assets
            .filter((asset) => asset.networkId === selectedNetwork.networkId)
            .map((asset) => (
              <Button
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
        Select the amount you'd like to sell
      </div>
      <div className="mt-4 flex items-center justify-center space-x-2">
        <Input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className=""
          type="number"
        />
        <span className="whitespace-nowrap text-black/80">
          {selectedAsset ? selectedAsset.symbol : ''}
        </span>
      </div>
      <Button
        onClick={handleChangeStep}
        variant="default"
        className="mt-8 w-full font-medium"
        size="sm"
        disabled={!selectedAsset || amount <= 0}
      >
        Continue
      </Button>
    </div>
  );
};
