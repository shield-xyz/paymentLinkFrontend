/* eslint-disable @next/next/no-img-element */

'use client';

import { useMemo } from 'react';

import { CustomPagination } from '@/components';
import CustomTable from '@/components/CustomTable';
import Container from '@/components/ui/container';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePagination } from '@/hooks';
import { formatDate } from '@/lib/utils';

const headers = [
  {
    key: 'type',
    title: 'Type',
    className: 'px-2 min-w-[150px] font-light font-semibold',
  },
  {
    key: 'status',
    title: 'Status',
    className: 'px-2 min-w-[150px] font-light font-semibold',
  },
  {
    key: 'amount',
    title: 'Amount',
    className: 'px-2 min-w-[150px] font-light font-semibold',
  },
  {
    key: 'asset',
    title: 'Asset',
    className: 'px-2 min-w-[200px] font-light font-semibold',
  },
  {
    key: 'network',
    title: 'Network',
    className: 'px-2 min-w-[200px] font-light font-semibold',
  },
  {
    key: 'date',
    title: 'Date',
    className: 'px-2 min-w-[120px] font-light font-semibold',
  },
];

const statusGroups = [{ label: 'All', value: 'all', filter: () => true }];

const cellRenderers = {
  type: ({ row }) => <span className="font-light">{row.type}</span>,
  status: ({ row }) => <span className="font-light">{row.status}</span>,
  amount: ({ row }) => {
    const txn = row.transactionDetails;
    return (
      <span className="font-light">
        {txn.amountToTransfer ?? txn.amountTransferred}
      </span>
    );
  },
  asset: ({ row }) => {
    const txn = row.transactionDetails;
    return (
      <div className="flex w-full items-center gap-5">
        <span className="text-sm">{txn.assetId}</span>
      </div>
    );
  },
  network: ({ row }) => {
    const txn = row.transactionDetails;
    return (
      <div className="flex w-full items-center gap-5">
        <span className="text-sm">{txn.networkId}</span>
      </div>
    );
  },
  date: ({ row }) => (
    <span className="font-light">{formatDate(row.createdAt)}</span>
  ),
};

export function RampsTable({ transactions }) {
  const groupCounts = useMemo(
    () =>
      statusGroups.map((group) => ({
        ...group,
        count: transactions.filter(group.filter).length,
      })),
    [transactions],
  );

  const itemsPerPage = 5;

  const { currentData, currentPage, jump, maxPage, next, prev } = usePagination(
    transactions,
    itemsPerPage,
  );

  return (
    <div className="flex h-full flex-col gap-2">
      <Container className="flex h-full w-full flex-col px-6 py-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-xl font-medium">Ramps</h1>
        </div>
        <Tabs defaultValue="all" className="w-full overflow-auto">
          <TabsList className="mb-5 w-full min-w-fit justify-start">
            {groupCounts.map((group) => (
              <TabsTrigger value={group.value} key={group.value + 'tab'}>
                {group.label}{' '}
                <span className="ml-1 text-muted-foreground">
                  ({group.count})
                </span>
              </TabsTrigger>
            ))}
          </TabsList>
          {statusGroups.map((group) => (
            <TabsContent
              className="w-full"
              value={group.value}
              key={group.value}
            >
              <CustomTable
                headers={headers}
                rows={currentData}
                rowKey="_id"
                cellRenderers={cellRenderers}
              />
            </TabsContent>
          ))}
        </Tabs>
        <CustomPagination
          currentPage={currentPage}
          maxPage={maxPage}
          jump={jump}
          prev={prev}
          next={next}
        />
      </Container>
    </div>
  );
}
