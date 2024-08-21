/* eslint-disable @next/next/no-img-element */

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

import { CustomPagination } from '@/components';
import CustomTable from '@/components/CustomTable';
import FilterDropDown from '@/components/FilterDropDown';
import { HashLink } from '@/components/Hash';
import Searchbar from '@/components/Searchbar';
import { Button } from '@/components/ui/button';
import Container from '@/components/ui/container';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePagination } from '@/hooks';
import { formatDate } from '@/lib/utils';

const headers = [
  {
    key: 'network',
    title: 'Network',
    className: 'px-2 min-w-[150px] font-light font-semibold',
  },
  {
    key: 'hash',
    title: 'Hash',
    className: 'px-2 min-w-[150px] font-light font-semibold',
  },
  {
    key: 'amount',
    title: 'Amount',
    className: 'px-2 min-w-[150px] font-light font-semibold',
  },
  {
    key: 'linkPaymentId',
    title: 'Payment ID',
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
  network: ({ row }) => {
    const network = row.network;
    return (
      <div className="flex w-full items-center gap-5">
        <Image
          key={network?.assetId}
          src={network?.logo}
          alt={network?.name}
          width={14}
          height={14}
        />
        <span className="text-sm">{network?.name}</span>
      </div>
    );
  },
  hash: ({ row }) => <HashLink network={row.network} hash={row.hash} />,
  amount: ({ row }) => {
    return (
      <span className="font-light">
        {row.amount || 0} {row.asset?.symbol}
      </span>
    );
  },
  currency: ({ row }) => <span className="font-light">{row.token}</span>,
  linkPaymentId: ({ row }) => (
    <span className="font-light">{row.linkPaymentId || '-'}</span>
  ),
  date: ({ row }) => <span className="font-light">{formatDate(row.date)}</span>,
};

export function TransactionsTable({ transactions }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(transactions);
  const [selectedTab, setSelectedTab] = useState('all');

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
    filteredData,
    itemsPerPage,
  );

  useEffect(() => {
    const filterData = () => {
      const filteredLinks = transactions.filter((transaction) => {
        const matchesTab =
          selectedTab === 'all' || transaction.status === selectedTab;
        if (!searchQuery && matchesTab) return true;
        const lowercasedQuery = searchQuery.toLowerCase();

        return (
          matchesTab &&
          formatDate(transaction.date).toLowerCase().includes(lowercasedQuery)
        );
      });
      setFilteredData(filteredLinks);
    };

    filterData();
  }, [transactions, searchQuery, selectedTab]);

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
          <h1 className="text-xl font-medium">Transactions</h1>
          <div className="flex flex-wrap items-center gap-2">
            <Searchbar
              placeholder="Search by Network, Asset, Date"
              className="w-fit border border-input bg-background"
              onChange={handleSearch}
              value={searchQuery}
            />
            <FilterDropDown
              setFilteredData={setFilteredData}
              selectedTab={selectedTab}
            />
            <Link href="/create-payment-link">
              <Button className="font-light" size="sm">
                Create payment link
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
