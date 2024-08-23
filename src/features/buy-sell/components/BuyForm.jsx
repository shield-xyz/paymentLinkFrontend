import { ShieldCheck } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useRef, useState } from 'react';

import { Input } from '@/components/ui/input';
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
import { PayPalCard } from './PayPalCard';
import { createPayPalOrder } from '../actions';

const BuyForm = () => {
  const { data: session } = useSession();
  const [fiat, setFiat] = useState('usd');
  const [amount, setAmount] = useState('$100');
  const [asset, setAsset] = useState(null);
  const [quote, setQuote] = useState(null);
  const [wallet, setWallet] = useState('');
  const [quoteTimeout, setQuoteTimeout] = useState(30);
  const [isFetchingQuote, setIsFetchingQuote] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [success, setSuccess] = useState(false);

  // Use ref for the PayPalButton to access the wallet input
  const walletInputRef = useRef(null);

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

  const fetchQuote = useCallback(() => {
    if (!amount || !asset) {
      setQuote(null);
      return;
    }

    setIsFetchingQuote(true);

    const assetOut = asset.symbol;
    const amountIn = amount.replace('$', '');

    const params = new URLSearchParams({ assetIn: fiat, assetOut, amountIn });

    fetch(`${env.NEXT_PUBLIC_API_URL}/api/quotes/onramp?${params.toString()}`)
      .then((res) => res.json())
      .then(setQuote)
      .catch((error) => {
        if (error.name === 'AbortError') {
          return;
        }
        console.error('Error fetching quote:', error);
      })
      .finally(() => setIsFetchingQuote(false));
  }, [amount, asset, fiat]);

  useEffect(() => {
    fetchQuote();
    setQuoteTimeout(30);

    const countdownInterval = setInterval(() => {
      setQuoteTimeout((prev) => {
        if (prev === 1) {
          fetchQuote();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    setIntervalId(countdownInterval);

    return () => {
      clearInterval(countdownInterval);
    };
  }, [fetchQuote]);

  useEffect(() => {
    setWallet('');
  }, [asset]);

  const createOrder = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }

    return createPayPalOrder(
      session.accessToken,
      quote.encoded,
      asset,
      walletInputRef.current.value,
    );
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center space-y-2 py-8">
        <ShieldCheck size={64} />
        <h3 className="text-lg font-bold">Your order has been received!</h3>
        <p className="text-center text-sm">
          You will receive an email confirmation shortly.
        </p>
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
      <Input
        type="text"
        className="mt-6"
        placeholder="Enter your wallet address"
        ref={walletInputRef}
        value={wallet}
        onChange={(e) => setWallet(e.target.value)}
      />
      {isFetchingQuote || !quote ? (
        <>
          <Skeleton className="my-6 h-[40px] w-[280px] self-center rounded-full" />
          <Skeleton className="h-[174px] w-[418px] rounded-lg" />
        </>
      ) : quote.error ? (
        <div className="px-4 pt-8">
          <h3 className="text-center text-lg font-normal">{quote.error}</h3>
        </div>
      ) : (
        <>
          <div className="my-6 w-auto self-center rounded-full bg-slate-100 px-4 py-1">
            New quote in <span className="font-semibold">{quoteTimeout}</span>{' '}
            seconds
          </div>
          <div className="flex flex-col">
            <PayPalCard
              disabled={!wallet}
              quote={quote}
              createOrder={createOrder}
              // onCancel={() => window.location.reload()}
              onApprove={() => setSuccess(true)}
              // onError={() => window.location.reload()}
            />
          </div>
        </>
      )}
    </div>
  );
};

export { BuyForm };
