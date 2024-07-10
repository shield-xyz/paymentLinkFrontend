'use client';

import { useMemo } from 'react';

import { CustomPagination } from '@/components';
import ActivityIcon from '@/components/ActivityIcon';
import Container from '@/components/ui/container';
import { usePagination } from '@/hooks';
import { formatDate } from '@/lib/utils';

const useProcessedData = (transactions, withdrawals) =>
  useMemo(() => {
    const processedTransactions = transactions.map((transaction) => ({
      ...transaction,
      name: 'Transaction',
    }));

    const processedWithdrawals = withdrawals.map((withdrawal) => ({
      ...withdrawal,
      name: 'Withdrawal',
    }));

    return [...processedTransactions, ...processedWithdrawals].sort(
      (a, b) => b.date - a.date,
    );
  }, [transactions, withdrawals]);

export const RecentActivities = ({ transactions, withdrawals }) => {
  const processedData = useProcessedData(transactions, withdrawals) || [];
  const { currentData, currentPage, jump, maxPage, next, prev } = usePagination(
    processedData,
    5,
  );

  return (
    <Container className="w-full px-5 py-6">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Recent activities</h3>
      </div>
      <div className="mt-8 flex flex-col gap-8">
        {currentData.map((activity, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center">
              <ActivityIcon type={activity.name} />
              <div className="ml-4 flex flex-col">
                <h4 className="text-sm font-medium">{activity.name}</h4>
                {/* <span className="text-xs text-gray-400">
                  <span className="text-green-500">{'completed'}</span>
                </span> */}
                <span className="text-xs font-light tracking-tighter text-muted-foreground">
                  {formatDate(activity.date)}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className={`text-xs`}>
                {activity.amount > 0 ? '+' : ''}
                {activity.amount} {activity.asset?.symbol}
              </span>
            </div>
          </div>
        ))}
      </div>
      <CustomPagination
        currentPage={currentPage}
        maxPage={maxPage}
        jump={jump}
        prev={prev}
        next={next}
        isShort
      />
    </Container>
  );
};
