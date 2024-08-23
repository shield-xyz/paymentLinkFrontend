import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
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

const SellForm = () => {
  const [fiat, setFiat] = useState('usd');
  const [amount, setAmount] = useState(100);
  const [asset, setAsset] = useState();
  const [quote, setQuote] = useState(null);
  const [quoteTimeout, setQuoteTimeout] = useState(30);
  const [isFetchingQuote, setIsFetchingQuote] = useState(true);

  const handleAmountChange = (e) => {
    const value = e.target.value;

    // If the value is empty, clear the amount
    if (!value) {
      setAmount('');
      return;
    }

    // Validate the input with a regular expression
    const validAmountRegex = /^\d*\.?\d*$/;
    if (!validAmountRegex.test(value)) {
      return;
    }

    setAmount(value);
  };

  useEffect(() => {
    const controller = new AbortController();

    const fetchQuote = () => {
      if (!amount || !asset) {
        setQuote(null);
        return;
      }

      setIsFetchingQuote(true);

      const assetIn = asset.symbol;

      const params = new URLSearchParams({
        assetIn,
        assetOut: fiat,
        amountIn: amount,
      });

      fetch(
        `${env.NEXT_PUBLIC_API_URL}/api/quotes/offramp?${params.toString()}`,
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

    return () => {
      clearInterval(countdownInterval);
      controller.abort();
    };
  }, [amount, asset, fiat]);

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
        placeholder="0"
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
        <>
          <div className="my-6 w-auto self-center rounded-full bg-slate-100 px-4 py-1">
            New quote in <span className="font-semibold">{quoteTimeout}</span>{' '}
            seconds
          </div>
          <div className="rounded-lg border-2 border-blue-300 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-500">
                {quote.amountIn} {quote.assetIn}
              </div>
              <div className="text-end">
                <div className="flex items-center gap-2 font-bold">
                  <span>≈</span>
                  <div>
                    {quote.amountOut} {quote.assetOut}
                  </div>
                </div>
              </div>
            </div>
            <Button className="mt-4 w-full rounded-full">
              Continue with the Transfer
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export { SellForm };
