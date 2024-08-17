/* eslint-disable react/jsx-key */
'use client';

import { useEffect, useState } from 'react';

import { getAssets } from '@/actions';
import { LogoIcon } from '@/assets';
import Container from '@/components/ui/container';
import { getNetworks } from '@/features/payment-link';
import { cn } from '@/lib/utils';

import { BuyOrSellForm } from './BuyOrSellForm';
import { SelectTokenForm } from './SelectTokenForm';
import { SetBankAccount } from './SetBankAccount';
import { SuccessForm } from './SuccessForm';
import { WaitingForPaymentForm } from './WaitingForPaymentForm';
import { useStore } from '../store';
import { FileSliders, Info, Waves } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

export const BuySellForm2 = () => {
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

        <div className="min-w-[500px] rounded-2xl border">
          <div className="flex justify-between pt-2">
            <Tabs
              defaultValue="all"
              className="left-0 w-full overflow-auto"
              onValueChange={() => null}
            >
              <TabsList className="sticky left-0 mb-5 px-6 w-full min-w-fit justify-start items-center">
                <TabsTrigger className="p-2" value="Buy">Buy</TabsTrigger>
                <TabsTrigger className="p-2" value="Sell">Sell</TabsTrigger>
                <FileSliders className='ml-auto text-gray-400 w-4' />
              </TabsList>
              <TabsContent className="w-full" value="Buy" s>
                <div className="flex flex-col p-8">
                  <Select onValueChange={() => null} defaultValue="USD">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="USD" />
                    </SelectTrigger>
                    <SelectContent className="max-h-48">
                      <SelectItem value={'USD'}>USD</SelectItem>
                      <SelectItem value={'TRON'}>TRON</SelectItem>
                      <SelectItem value={'DAI'}>DAI</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="my-8 text-center text-7xl font-extrabold">
                    $100
                  </div>
                  <div className="grid grid-cols-5 rounded-full border text-center">
                    <div className="border-r p-2">$50</div>
                    <div className="border-r p-2">$100</div>
                    <div className="border-r p-2">$250</div>
                    <div className="border-r p-2">$500</div>
                    <div className="p-2">$1k</div>
                  </div>
                  <div className="mt-4">
                    <Select onValueChange={() => null} defaultValue="USD">
                      <SelectTrigger className="w-full rounded-xl py-10">
                        <SelectValue placeholder="USD">
                          <div className="flex items-center gap-3">
                            <img src="/images/Tether2.png" alt="..." />
                            <div>
                              <div className="text-start text-xl font-bold">
                                Tether USD
                              </div>
                              <div>Ethereum Mainnet</div>
                            </div>
                          </div>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent className="max-h-48">
                        <SelectItem value={'USD'}>
                        <div className="flex items-center gap-3">
                            <img src="/images/Tether2.png" alt="..." />
                            <div>
                              <div className="text-start text-xl font-bold">
                                Tether USD
                              </div>
                              <div>Ethereum Mainnet</div>
                            </div>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="my-4 w-auto self-center rounded-full bg-slate-100 px-4 py-1">
                    New quotes in <span className="font-semibold">0:18</span>
                  </div>
                  <div className="rounded-lg border-2 p-4 border-blue-300">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div>Paypal</div>
                        <Info className='text-gray-400 w-4' />
                      </div>
                      <div className="text-end">
                        <div className="flex items-center gap-2 font-bold">
                          <Waves />
                          <div>100 USDT</div>
                        </div>
                        <div className='text-gray-500'>100 USD</div>
                      </div>
                    </div>
                    <Button className="w-full rounded-full mt-4">
                      Continue with PayPal
                    </Button>
                  </div>
                </div>
              </TabsContent>
              <TabsContent className="w-full" value="Sell" s>
                <div className="flex flex-col p-8">
                  <Select onValueChange={() => null} defaultValue="USD">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="USD" />
                    </SelectTrigger>
                    <SelectContent className="max-h-48">
                      <SelectItem value={'USD'}>USD</SelectItem>
                      <SelectItem value={'TRON'}>TRON</SelectItem>
                      <SelectItem value={'DAI'}>DAI</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="my-8 text-center text-7xl font-extrabold">
                    0.05 ETH
                  </div>
                  <div className="">
                    <Select onValueChange={() => null} defaultValue="USD">
                      <SelectTrigger className="w-full rounded-xl py-10">
                        <SelectValue placeholder="USD">
                          <div className="flex items-center gap-3">
                            <img className='w-10' src="/images/ethereum2.png" alt="..." />
                            <div>
                              <div className="text-start text-xl font-bold">
                                Ethereum
                              </div>
                              <div>Ethereum Mainnet</div>
                            </div>
                          </div>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent className="max-h-48">
                        <SelectItem value={'USD'}>
                        <div className="flex items-center gap-3">
                            <img src="/images/Tether2.png" alt="..." />
                            <div>
                              <div className="text-start text-xl font-bold">
                                Tether USD
                              </div>
                              <div>Ethereum Mainnet</div>
                            </div>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="my-4 w-auto self-center rounded-full bg-slate-100 px-4 py-1">
                    New quotes in <span className="font-semibold text-red-400">0:07</span>
                  </div>
                  <div className="rounded-lg border-2 p-4 border-blue-300">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-gray-500">
                        0.05 ETH
                      </div>
                      <div className="text-end">
                        <div className="flex items-center gap-2 font-bold">
                          <Waves />
                          <div>100 USDT</div>
                        </div>
                      </div>
                    </div>
                    <Button className="w-full rounded-full mt-4">
                      Continue with the Transfer
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
            </Tabs>
            
          </div>
        </div>
      </div>
    </Container>
  );
};
