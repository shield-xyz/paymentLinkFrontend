/* eslint-disable react/jsx-key */
'use client';

import { useEffect, useState } from 'react';

import { getAssets } from '@/actions';
import { LogoIcon } from '@/assets';
import { Button } from '@/components/ui/button';
import Container from '@/components/ui/container';
import { getNetworks } from '@/features/payment-link';
import { cn } from '@/lib/utils';

import { BuyOrSellForm } from './BuyOrSellForm';
import { SelectTokenForm } from './SelectTokenForm';
import { SetBankAccount } from './SetBankAccount';
import { SuccessForm } from './SuccessForm';
import { WaitingForPaymentForm } from './WaitingForPaymentForm';
import { useStore } from '../store';

export const BuySellForm = () => {
  const [step, setStep] = useState(0);

  const { success, side, setNetwork, setAsset, selectedNetwork } = useStore();

  const [networks, setNetworks] = useState([]);
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    getNetworks().then((networks) => {
      setNetworks(networks);
      setNetwork(networks.find((network) => network.networkId === 'tron'));
    });
    getAssets().then(setAssets);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!selectedNetwork) return;
    setAsset(
      assets.find((asset) => asset.networkId === selectedNetwork.networkId),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedNetwork]);

  const LISTS = [
    'Buy or Sell',
    'Select token',
    'Set bank account',
    'Waiting for payment',
    'Success',
  ];

  const handleChangeStep = () => {
    setStep((prev) => prev + 1);
  };

  const STEPS = [
    <BuyOrSellForm handleChangeStep={handleChangeStep} />,
    <SelectTokenForm
      handleChangeStep={handleChangeStep}
      networks={networks}
      assets={assets}
    />,
    <SetBankAccount handleChangeStep={handleChangeStep} />,
    <WaitingForPaymentForm handleChangeStep={handleChangeStep} />,
    <SuccessForm handleChangeStep={handleChangeStep} />,
  ];

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

        <div className="flex flex-col items-start gap-12 px-4 sm:flex-row">
          <div className="flex flex-col gap-2">
            {LISTS.filter(
              (list) => side === 'sell' || list !== 'Set bank account',
            ).map((list, index) => (
              <div key={`${list}-${index}`} className="flex items-center gap-2">
                <div className="h-1 w-1 rounded-full bg-black/15" />
                <Button
                  variant="outline"
                  className={`rounded-2xl font-medium text-black/30 ${step >= index ? 'border-2 border-[#3774EB]/30 text-black' : ''}`}
                  onClick={() => setStep(index)}
                  disabled={step < index || success}
                >
                  {list}
                </Button>
              </div>
            ))}
          </div>

          {STEPS.filter((_, index) => side === 'sell' || index !== 2)[step]}
        </div>
      </div>
    </Container>
  );
};
