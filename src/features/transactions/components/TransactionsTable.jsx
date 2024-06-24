/* eslint-disable @next/next/no-img-element */

'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

import { CustomPagination, Icons } from '@/components';
import CustomTable from '@/components/CustomTable';
import Searchbar from '@/components/Searchbar';
import { Button } from '@/components/ui/button';
import Container from '@/components/ui/container';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { copyCode } from '@/features/payment-link';
import { usePagination } from '@/hooks';
import { formatCurrency, formatDate } from '@/lib/utils';

const headers = [
  {
    key: 'network',
    title: 'Network',
    className: 'px-2 min-w-[150px] font-light font-semibold',
  },
  {
    key: 'asset',
    title: 'Asset',
    className: 'px-2 min-w-[150px] font-light font-semibold',
  },
  {
    key: 'hash',
    title: 'Hash',
    className: 'px-2 min-w-[220px] font-light font-semibold',
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
  network: ({ row, networks }) => {
    const network = networks.find((network) => network._id === row.networkId);
    return <span className="font-light">{network.name}</span>;
  },
  asset: ({ row, assets }) => {
    const asset = Object.values(assets).find(
      (asset) => asset._id === row.assetId,
    );
    let logoSrc = asset.logo;
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
  hash: ({ row }) => (
    <span
      className="flex max-w-[200px] items-center gap-1 font-light"
      onClick={() => copyCode(row.hash)}
    >
      <span className="line-clamp-1 w-full cursor-pointer overflow-hidden text-ellipsis break-all text-blue-400">
        {row.hash}
      </span>
      <Icons.copy className="h-10 w-10 cursor-pointer rounded-md p-2 hover:bg-muted" />
    </span>
  ),
  amount: ({ row }) => {
    return (
      <span className="font-light">{formatCurrency(row.amount || 0)}</span>
    );
  },
  currency: ({ row }) => <span className="font-light">{row.token}</span>,
  linkPaymentId: ({ row }) => (
    <span className="font-light">{row.linkPaymentId || '-'}</span>
  ),
  date: ({ row }) => <span className="font-light">{formatDate(row.date)}</span>,
};

export function TransactionsTable({ transactions, assets, networks }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(transactions);
  const [selectedTab, setSelectedTab] = useState('all');

  console.log({ transactions, assets, networks });

  const assetsByAssetId = useMemo(
    () =>
      Object.values(assets).reduce((acc, asset) => {
        acc[asset._id] = asset;
        return acc;
      }, {}),
    [assets],
  );

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
        const assetName =
          assetsByAssetId[transaction.assetId].name.toLowerCase();
        const networkName = networks
          .find((network) => network._id === transaction.networkId)
          .name.toLowerCase();
        return (
          matchesTab &&
          (assetName.includes(lowercasedQuery) ||
            networkName.includes(lowercasedQuery) ||
            formatDate(transaction.date)
              .toLowerCase()
              .includes(lowercasedQuery))
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
            <Button variant="outline" className="gap-2 font-light" size="sm">
              <Icons.filter className="h-5 text-gray-500" />
              Filter
            </Button>
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
                assets={assets}
                networks={networks}
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
