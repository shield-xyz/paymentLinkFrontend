'use client';

import { useState } from 'react';
import { toast } from 'sonner';

import { PayPalCard } from './PayPalCard';
import { WireCard } from './WireCard';
import { createPayPalOrder, createWireOrder } from '../actions';

const QuotesList = ({
  quotes,
  quoteTimeout,
  walletInputRef,
  wallet,
  intervalId,
  setIntervalId,
  setShowWireDetails,
  setWireOrder,
  setSuccess,
  session,
  asset,
}) => {
  const [isWireLoading, setIsWireLoading] = useState(false);

  return (
    <>
      <div className="my-6 w-auto self-center rounded-full bg-slate-100 px-4 py-1">
        New quote in <span className="font-semibold">{quoteTimeout}</span>{' '}
        seconds
      </div>
      <div className="flex max-h-[250px] flex-col space-y-2 overflow-y-scroll">
        {quotes.map((quote) => {
          if (quote.error) {
            return (
              <div key={quote.provider} className="px-4 pt-8">
                <h3 className="text-center text-lg font-normal">
                  {quote.error}
                </h3>
              </div>
            );
          }

          if (quote.provider === 'wire') {
            return (
              <WireCard
                key={quote.provider}
                quote={quote}
                disabled={!wallet}
                loading={isWireLoading}
                onWire={async () => {
                  setIsWireLoading(true);
                  const { status, id } = await createWireOrder(
                    session.accessToken,
                    quote.encoded,
                    asset.networkId,
                    walletInputRef.current.value,
                  );

                  setIsWireLoading(false);

                  if (status === 'unverified') {
                    toast.warning('Must verify your account to continue');
                  } else if (status !== 'success') {
                    toast.error('Error creating wire order');
                  } else {
                    clearInterval(intervalId);
                    setIntervalId(null);
                    setWireOrder(id);
                    setShowWireDetails(true);
                  }
                }}
              />
            );
          }

          if (quote.provider === 'paypal') {
            return (
              <PayPalCard
                key={quote.provider}
                disabled={!wallet}
                quote={quote}
                createOrder={async () => {
                  const { status, id } = await createPayPalOrder(
                    session.accessToken,
                    quote.encoded,
                    asset.networkId,
                    walletInputRef.current.value,
                  );

                  if (status === 'unverified') {
                    toast.warning('Must verify your account to continue');
                  }

                  clearInterval(intervalId);
                  setIntervalId(null);
                  return id;
                }}
                onCancel={() => window.location.reload()}
                onApprove={() => setSuccess(true)}
              />
            );
          }
        })}
      </div>
    </>
  );
};

export { QuotesList };
