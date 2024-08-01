'use client';

import { useEffect, useState } from 'react';

import { useStore } from '../store';
import { BuyOrSellForm } from './BuyOrSellForm';
import { SelectTokenForm } from './SelectTokenForm';
import { SuccessForm } from './SuccessForm';
import { WaitingForPaymentForm } from './WaitingForPaymentForm';

import { getAssets } from '@/actions';
import { LogoIcon } from '@/assets';
import { Button } from '@/components/ui/button';
import Container from '@/components/ui/container';
import { getNetworks } from '@/features/payment-link';
import { cn } from '@/lib/utils';

export const BuySellFrom = () => {
  const [step, setStep] = useState(1);

  const { setNetwork, setAsset, selectedNetwork } = useStore();

  const [networks, setNetworks] = useState([]);
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    getNetworks().then((networks) => {
      setNetworks(networks);
      setNetwork(networks.find((network) => network.networkId === 'tron'));
    });
    getAssets().then(setAssets);
  }, []);

  useEffect(() => {
    setAsset(
      assets.find((asset) => asset.networkId === selectedNetwork.networkId),
    );
  }, [selectedNetwork]);

  const LISTS = [
    'Buy or Sell',
    'Select token',
    'Waiting for payment',
    // 'Processing payment',
    'Success',
  ];

  const handleChangeStep = () => {
    setStep((prev) => prev + 1);
  };

  const STEPS = {
    1: <BuyOrSellForm handleChangeStep={handleChangeStep} />,
    2: (
      <SelectTokenForm
        handleChangeStep={handleChangeStep}
        networks={networks}
        assets={assets}
      />
    ),
    3: <WaitingForPaymentForm handleChangeStep={handleChangeStep} />,
    // 4: <ProcessingPaymentForm handleChangeStep={handleChangeStep} />,
    4: <SuccessForm handleChangeStep={handleChangeStep} />,
  };

  return (
    <Container className="min-h-screen pt-12">
      <div className="flex flex-col items-center justify-center gap-8">
        <div className="flex items-center">
          <div
            className={cn(
              'mr-1.5 flex h-11 w-11 items-center justify-center rounded-lg bg-black/5',
            )}
          >
            <LogoIcon className="scale-[0.5]" />
          </div>
          <div className="text-4xl font-semibold">Shield</div>
        </div>

        <div className="flex items-start gap-12">
          <div className="flex flex-col gap-2">
            {LISTS.map((list, index) => (
              <div className="flex items-center gap-2">
                <div className="h-1 w-1 rounded-full bg-black/15" />
                <Button
                  variant="outline"
                  className={`rounded-2xl font-medium text-black/30 ${step >= index + 1 ? 'border-2 border-[#3774EB]/30 text-black' : ''}`}
                  onClick={() => setStep(index + 1)}
                  disabled={step < index + 1}
                >
                  {list}
                </Button>
              </div>
            ))}
          </div>

          {STEPS[step]}
        </div>
      </div>
    </Container>
  );
};
