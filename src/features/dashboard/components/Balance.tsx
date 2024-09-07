'use client';

import { format, parseISO } from 'date-fns';
import { useMemo } from 'react';

import { Icons } from '@/components';
import Chart from '@/components/Recharts/Chart';
import Container from '@/components/ui/container';
import { Withdraw } from '@/features/withdrawals';
import { formatCurrency } from '@/lib/utils';

// Custom hook for processing transactions
const useProcessedData = (
  transactions,
): {
  name: string;
  amt: number;
}[] =>
  useMemo(() => {
    const sortedTransactions = transactions.sort((a, b) =>
      a.date.localeCompare(b.date),
    );
    let cumulativeSum = 0;
    const groupedByDay = {};

    sortedTransactions.forEach((transaction) => {
      const day = format(parseISO(transaction.date), 'yyyy-MM-dd');
      groupedByDay[day] =
        (groupedByDay[day] || cumulativeSum) + transaction.usdValue;
      cumulativeSum += transaction.usdValue;
    });

    return Object.entries(groupedByDay).map(
      ([name, amt]: [string, number]) => ({ name, amt }),
    );
  }, [transactions]);

// Custom hook for calculating total amount
const useTotalAmount = (balances) =>
  useMemo(
    () =>
      balances.reduce(
        (acc, balance) => acc + balance.amount * balance.usdValue,
        0,
      ),
    [balances],
  );

export const Balance = ({ balances, transactions }) => {
  const data = useProcessedData(transactions);
  const totalAmount = useTotalAmount(balances);
  const formattedAmount = useMemo(
    () => formatCurrency(totalAmount),
    [totalAmount],
  );
  const [whole, cent] = formattedAmount.split('.');

  // Calculate percentage increment
  const percentageIncrement = useMemo(() => {
    if (data.length > 1) {
      const last = data[data.length - 1].amt;
      const secondLast = data[data.length - 2].amt;
      return (
        ((Number(last) - Number(secondLast)) / Number(secondLast)) *
        100
      ).toFixed(2);
    }
    return 0;
  }, [data]);

  return (
    <Container className="p-4 xl:p-0">
      <div className="px-5 pt-5">
        <span className="mb-2 flex items-center gap-4 text-xl font-medium">
          Total Balance <Icons.chevronRight />
        </span>
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-0">
            <span className="text-5xl font-semibold">{whole}</span>
            <span className="text-5xl font-semibold text-gray-400">
              .{cent}
            </span>
            <div className="ml-2 flex items-baseline gap-1 text-success">
              <Icons.arrowUpCompressed />
              <span>{percentageIncrement}%</span>
            </div>
          </div>
          <Withdraw />
        </div>
      </div>

      <div className="h-96">
        <Chart data={data} />
      </div>
    </Container>
  );
};
