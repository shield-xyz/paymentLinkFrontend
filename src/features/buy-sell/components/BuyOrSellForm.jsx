/* eslint-disable react/jsx-key */
'use client';

import { PayPalScriptProvider } from '@paypal/react-paypal-js';

import { LogoIcon } from '@/assets';
import Container from '@/components/ui/container';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

import { BuyForm } from './BuyForm';
import { SellForm } from './SellForm';

const initialOptions = {
  clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
  currency: 'USD',
  intent: 'capture',
};

export const BuyOrSellForm = () => {
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
        <div className="w-full max-w-[500px] rounded-2xl border">
          <div className="flex justify-between pt-2">
            <Tabs
              defaultValue="Buy"
              className="left-0 w-full overflow-auto"
              onValueChange={() => {}}
            >
              <TabsList className="sticky left-0 w-full min-w-fit items-center justify-start px-6">
                <TabsTrigger className="p-2" value="Buy">
                  Buy
                </TabsTrigger>
                <TabsTrigger className="p-2" value="Sell">
                  Sell
                </TabsTrigger>
              </TabsList>
              <TabsContent className="w-full" value="Buy">
                <PayPalScriptProvider options={initialOptions}>
                  <BuyForm />
                </PayPalScriptProvider>
              </TabsContent>
              <TabsContent className="w-full" value="Sell">
                <SellForm />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Container>
  );
};
