/* eslint-disable @next/next/no-img-element */

'use client';

import { useEffect, useMemo, useState } from 'react';

import { CustomPagination } from '@/components';
import { Badge } from '@/components/Bage';
import CustomTable from '@/components/CustomTable';
import FilterDropDown from '@/components/FilterDropDown';
import Container from '@/components/ui/container';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePagination } from '@/hooks';
import { formatDate } from '@/lib/utils';

const headers = [
  {
    key: 'asset',
    title: 'Asset',
    className: 'px-2 min-w-[200px] font-light font-semibold',
  },
  {
    key: 'amount',
    title: 'Amount',
    className: 'px-2 min-w-[100px] font-light font-semibold',
  },
  {
    key: 'date',
    title: 'Date',
    className: 'px-2 min-w-[120px] font-light font-semibold',
  },
  {
    key: 'status',
    title: 'Status',
    className: 'px-2 min-w-[100px] font-light font-semibold',
  },
];

const statusGroups = [
  { label: 'All', value: 'all', filter: () => true },
  {
    label: 'Paid',
    value: 'paid',
    filter: (deposit) => deposit.status === 'success',
  },
  {
    label: 'Pending',
    value: 'pending',
    filter: (deposit) => deposit.status === 'notified',
  },
];

const cellRenderers = {
  asset: ({ row, assets }) => {
    const txn = row.transactionDetails;
    const asset = assets[txn.assetId];
    const logoSrc = asset.logo;
    return (
      <div className="flex w-full items-center gap-5">
        <img
          key={asset.assetId}
          src={logoSrc}
          alt={asset.assetId}
          width={14}
          height={14}
        />
        <span className="text-sm">{asset.name}</span>
      </div>
    );
  },
  amount: ({ row }) => {
    const txn = row.transactionDetails;
    return (
      <span className="font-light">
        {txn.amountTransferred ?? txn.amountToTransfer}
      </span>
    );
  },
  date: ({ row }) => (
    <span className="font-light">{formatDate(row.createdAt)}</span>
  ),
  status: ({ row }) => {
    const status = row.status === 'notified' ? 'pending' : row.status;
    return <Badge variant={status}>{status}</Badge>;
  },
};

export function DepositsTable({ deposits, assets }) {
  const [filteredData, setFilteredData] = useState(deposits);
  const [selectedTab, setSelectedTab] = useState('all');

  const groupCounts = useMemo(
    () =>
      statusGroups.map((group) => ({
        ...group,
        count: deposits.filter(group.filter).length,
      })),
    [deposits],
  );

  const itemsPerPage = 5;

  const { currentData, currentPage, jump, maxPage, next, prev } = usePagination(
    filteredData,
    itemsPerPage,
  );

  useEffect(() => {
    const filterData = () => {
      const filteredLinks = deposits.filter((deposit) => {
        const status =
          deposit.status === 'notified' ? 'pending' : deposit.status;
        const matchesTab = selectedTab === 'all' || status === selectedTab;
        return matchesTab;
      });
      setFilteredData(filteredLinks);
    };

    filterData();
  }, [deposits, selectedTab]);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div className="flex h-full flex-col gap-2">
      <Container className="flex h-full w-full flex-col px-6 py-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-xl font-medium">Deposit History</h1>
          <div className="flex flex-wrap items-center gap-2">
            <FilterDropDown
              setFilteredData={setFilteredData}
              selectedTab={selectedTab}
            />
          </div>
        </div>
        <Tabs
          defaultValue="all"
          className="w-full overflow-auto"
          onValueChange={handleTabChange}
        >
          <TabsList className="mb-5 w-full min-w-fit justify-start">
            {groupCounts.map((group) => (
              <TabsTrigger value={group.value} key={group.value}>
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
                assets={assets}
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
