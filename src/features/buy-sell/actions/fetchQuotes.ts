import { env } from '@/config';

export const fetchQuotes = async ({
  amount,
  asset,
  fiat,
  setQuotes,
  setIsFetchingQuotes,
}) => {
  if (!amount || !asset) {
    setQuotes(null);
    return;
  }

  setIsFetchingQuotes(true);
  const assetOut = asset.symbol;
  const amountIn = amount.replace('$', '');

  const params = new URLSearchParams({ assetIn: fiat, assetOut, amountIn });

  try {
    const response = await fetch(
      `${env.NEXT_PUBLIC_API_URL}/api/quotes/onramp?${params.toString()}`,
    );
    const data = await response.json();
    setQuotes(data);
  } catch (error) {
    if (error.name !== 'AbortError') {
      console.error('Error fetching quotes:', error);
    }
  } finally {
    setIsFetchingQuotes(false);
  }
};
