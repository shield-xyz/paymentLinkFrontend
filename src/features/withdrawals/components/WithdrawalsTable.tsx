/* eslint-disable @next/next/no-img-element */

'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

import { CustomPagination } from '@/components';
import { Badge } from '@/components/Bage';
import CustomTable from '@/components/CustomTable';
import FilterDropDown from '@/components/FilterDropDown';
import Searchbar from '@/components/Searchbar';
import { Button } from '@/components/ui/button';
import Container from '@/components/ui/container';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePagination } from '@/hooks';
import { PAYMENT_STATUSES, formatDate } from '@/lib/utils';

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
    value: PAYMENT_STATUSES.Paid,
    filter: (withdrawal) => withdrawal.status === PAYMENT_STATUSES.Paid,
  },
  {
    label: 'Pending',
    value: PAYMENT_STATUSES.Pending,
    filter: (withdrawal) => withdrawal.status === PAYMENT_STATUSES.Pending,
  },
  {
    label: 'Paused',
    value: PAYMENT_STATUSES.Paused,
    filter: (withdrawal) => withdrawal.status === PAYMENT_STATUSES.Paused,
  },
  {
    label: 'Expired',
    value: PAYMENT_STATUSES.Expired,
    filter: (withdrawal) => withdrawal.status === PAYMENT_STATUSES.Expired,
  },
];

const cellRenderers = {
  asset: ({ row, assets }) => {
    const asset = assets[row.assetId];
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
    return <span className="font-light">{row.amount || 0}</span>;
  },
  currency: ({ row }) => <span className="font-light">{row.token}</span>,
  status: ({ row }) => <Badge variant={row.status}>{row.status}</Badge>,
  date: ({ row }) => <span className="font-light">{formatDate(row.date)}</span>,
};

export function WithdrawalsTable({ withdrawals, assets }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(withdrawals);
  const [selectedTab, setSelectedTab] = useState('all');

  const groupCounts = useMemo(
    () =>
      statusGroups.map((group) => ({
        ...group,
        count: withdrawals.filter(group.filter).length,
      })),
    [withdrawals],
  );

  const itemsPerPage = 5;

  const { currentData, currentPage, jump, maxPage, next, prev } =
    usePagination(filteredData);

  useEffect(() => {
    const filterData = () => {
      const filteredLinks = withdrawals.filter((withdrawal) => {
        const matchesTab =
          selectedTab === 'all' || withdrawal.status === selectedTab;
        if (!searchQuery && matchesTab) return true;
        const lowercasedQuery = searchQuery.toLowerCase();
        return (
          matchesTab &&
          (withdrawal.status.toLowerCase().includes(lowercasedQuery) ||
            formatDate(withdrawal.date).toLowerCase().includes(lowercasedQuery))
        );
      });
      setFilteredData(filteredLinks);
    };

    filterData();
  }, [withdrawals, searchQuery, selectedTab]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div className="flex h-full flex-col gap-2">
      <Container className="flex h-full w-full flex-col px-6 py-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-xl font-medium">Withdrawal History</h1>
          <div className="flex flex-wrap items-center gap-2">
            <Searchbar
              placeholder="Search by Date, Time, Status"
              className="w-fit border border-input bg-background"
              onChange={handleSearch}
              value={searchQuery}
            />
            <FilterDropDown setFilteredData={setFilteredData} />
            <Link href="/create-payment-link">
              <Button className="font-light" size="sm">
                Create payment withdrawal
              </Button>
            </Link>
          </div>
        </div>
        <Tabs
          defaultValue="all"
          className="w-full overflow-auto"
          onValueChange={handleTabChange}
        >
          <TabsList className="sticky left-0 mb-5 w-full min-w-fit justify-start">
            {' '}
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
