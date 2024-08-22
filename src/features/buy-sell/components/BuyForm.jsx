import {
  FUNDING,
  PayPalButtons,
  PayPalScriptProvider,
} from '@paypal/react-paypal-js';
import { Info, ShieldCheck } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import { Loader } from '@/components';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { env } from '@/config';

import { AssetSelect } from './AssetSelect';
import { createPayPalOrder } from '../actions/createPayPalOrder';

const initialOptions = {
  clientId:
    'AYNk6S6qmCQAAvQO4X5WkjGSzMOezf85eL-juw3626DXW57oRT0Vcf8mRMv7MwXVNg9Gpg3KgkrdSwXQ',
  currency: 'USD',
  intent: 'capture',
};

const BuyForm = () => {
  const session = useSession();

  const [fiat, setFiat] = useState('usd');
  const [amount, setAmount] = useState('$100');
  const [asset, setAsset] = useState(null);
  const [quote, setQuote] = useState(null);
  const [quoteTimeout, setQuoteTimeout] = useState(30);
  const [isFetchingQuote, setIsFetchingQuote] = useState(true);
  const [intervalId, setIntervalId] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleAmountChange = (e) => {
    const value = e.target.value;

    if (!value) {
      setAmount('');
      return;
    }

    const validAmountRegex = /^\$?\d*\.?\d*$/;
    if (!validAmountRegex.test(value)) {
      return;
    }

    if (value.startsWith('$')) {
      setAmount(value === '$' ? '' : value);
    } else {
      if (Number(value) > 0) {
        setAmount(`$${value}`);
      }
    }
  };

  useEffect(() => {
    const controller = new AbortController();

    const fetchQuote = () => {
      if (!amount || !asset) {
        setQuote(null);
        return;
      }

      setIsFetchingQuote(true);

      const assetOut = asset.symbol;
      const amountIn = amount.replace('$', '');

      const params = new URLSearchParams({ assetIn: fiat, assetOut, amountIn });

      fetch(
        `${env.NEXT_PUBLIC_API_URL}/api/quotes/onramp?${params.toString()}`,
        {
          signal: controller.signal,
        },
      )
        .then((res) => res.json())
        .then(setQuote)
        .catch((error) => {
          if (error.name === 'AbortError') {
            return;
          }
        })
        .finally(() => {
          if (!controller.signal.aborted) {
            setIsFetchingQuote(false);
          }
        });
    };

    fetchQuote();
    setQuoteTimeout(30); // Reset the timer when dependencies change

    const countdownInterval = setInterval(() => {
      setQuoteTimeout((prev) => {
        if (prev === 1) {
          fetchQuote(); // Refetch the quote when the timer hits zero
          return 30; // Restart the timer
        }
        return prev - 1;
      });
    }, 1000);

    setIntervalId(countdownInterval); // Store the interval ID

    return () => {
      clearInterval(countdownInterval);
      controller.abort();
    };
  }, [amount, asset, fiat]);

  const handlePayPalButtonClick = () => {
    if (intervalId) {
      clearInterval(intervalId); // Stop the timer when the PayPal button is clicked
      setIntervalId(null); // Reset the interval ID
    }
  };

  if (isProcessing) {
    return (
      <div className="flex flex-col items-center justify-center space-y-2 py-8">
        <Loader />
        <h3 className="text-lg font-bold">Processing order...</h3>
      </div>
    );
  }

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center space-y-2 py-8">
        <ShieldCheck size={64} />
        <h3 className="text-lg font-bold">Your order has been processed!</h3>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-8">
      <Select onValueChange={setFiat} value={fiat}>
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="max-h-48">
          <SelectItem value="usd">USD</SelectItem>
        </SelectContent>
      </Select>
      <input
        className="my-8 w-full text-center text-6xl font-extrabold focus:outline-none"
        type="text"
        placeholder="$0"
        value={amount}
        inputMode="numeric"
        onChange={handleAmountChange}
      />
      <AssetSelect value={asset} onValueChange={setAsset} />
      {isFetchingQuote ? (
        <>
          <Skeleton className="my-6 h-[40px] w-[280px] self-center rounded-full" />
          <Skeleton className="h-[174px] w-[418px] rounded-lg" />
        </>
      ) : quote && quote.error ? (
        <div className="px-4 pt-8">
          <h3 className="text-center text-lg font-normal">{quote.error}</h3>
        </div>
      ) : (
        <PayPalScriptProvider options={initialOptions}>
          <div className="my-6 w-auto self-center rounded-full bg-slate-100 px-4 py-1">
            New quote in <span className="font-semibold">{quoteTimeout}</span>{' '}
            seconds
          </div>
          <div className="rounded-lg border-2 border-blue-300 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div>Paypal</div>
                <Info className="w-4 text-gray-400" />
              </div>
              <div className="text-end">
                <div className="flex items-center gap-2 font-bold">
                  <span>≈</span>
                  <div>
                    {quote.amountOut} {quote.assetOut}
                  </div>
                </div>
                <div className="text-gray-500">
                  {quote.amountIn} {quote.assetIn}
                </div>
              </div>
            </div>
            <PayPalButtons
              fundingSource={FUNDING.PAYPAL}
              className="mt-4"
              onClick={handlePayPalButtonClick}
              createOrder={() =>
                createPayPalOrder(session.data.accessToken, quote.encoded)
              }
              onCancel={() => window.location.reload()}
              onApprove={async (data) => {
                console.log(data);
                setIsProcessing(true);
                await new Promise((resolve) => setTimeout(resolve, 3000));
                setIsProcessing(false);
                setSuccess(true);
              }}
            />
          </div>
        </PayPalScriptProvider>
      )}
    </div>
  );
};

export { BuyForm };
