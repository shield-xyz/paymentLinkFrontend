'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

import { CustomPagination, Icons } from '@/components';
import CustomTable from '@/components/CustomTable';
import { HashString } from '@/components/Hash';
import Searchbar from '@/components/Searchbar';
import { Button } from '@/components/ui/button';
import Container from '@/components/ui/container';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePagination } from '@/hooks';
import { formatDate } from '@/lib/utils';

const headers = [
  {
    key: 'client',
    title: 'Client',
    className: 'px-2 min-w-[150px] font-light font-semibold',
  },
  {
    key: 'date',
    title: 'Date',
    className: 'px-2 min-w-[120px] font-light font-semibold',
  },
  {
    key: 'receivedAmount',
    title: 'Received Amount',
    className: 'px-2 min-w-[120px] font-light font-semibold',
  },
  {
    key: 'shieldFee',
    title: 'Shield Fee',
    className: 'px-2 min-w-[120px] font-light font-semibold',
  },
  {
    key: 'symbol',
    title: 'Symbol',
    className: 'px-2 min-w-[120px] font-light font-semibold',
  },
  {
    key: 'blockchain',
    title: 'Blockchain',
    className: 'px-2 min-w-[120px] font-light font-semibold',
  },
  {
    key: 'tx',
    title: 'Tx',
    className: 'px-2 min-w-[200px] font-light font-semibold',
  },
  {
    key: 'walletSend',
    title: 'Wallet Send',
    className: 'px-2 min-w-[200px] font-light font-semibold',
  },
  {
    key: 'actions',
    title: 'Actions',
    className: 'px-2 min-w-[120px] font-light font-semibold',
  },
];

const statusGroups = [{ label: 'All', value: 'all', filter: () => true }];

const cellRenderers = {
  business: ({ row }) => (
    <span className="line-clamp-1 text-ellipsis text-sm">{row.business}</span>
  ),
  client: ({ row }) => (
    <span className="line-clamp-1 text-ellipsis text-sm">{row.client}</span>
  ),
  date: ({ row }) => <span className="font-light">{formatDate(row.date)}</span>,
  receivedAmount: ({ row }) => (
    <span className="font-light">{row.receivedAmount}</span>
  ),
  shieldFee: ({ row }) => <span className="font-light">{row.shieldFee}</span>,
  symbol: ({ row }) => <span className="font-light">{row.symbol}</span>,
  blockchain: ({ row }) => <span className="font-light">{row.blockchain}</span>,
  tx: ({ row }) => {
    <HashString hash={row.tx} withCopy />;
  },
  walletSend: ({ row }) => <HashString hash={row.walletSend} withCopy />,
  actions: ({ row }) => {
    return (
      <div className="flex items-center gap-2">
        {/* <Button variant="ghost" className="px-2 py-2 font-light">
          <Icons.edit className="h-5 text-gray-500" />
        </Button> */}
        <Link href={`/volume/${row._id}`} scroll={false}>
          <Button variant="ghost" className="px-2 py-2 font-light">
            <Icons.edit className="h-5 text-gray-500" />
          </Button>
        </Link>
      </div>
    );
  },
  // Add or modify renderers as necessary
};

export function VolumeTransactionsTable({ transactions }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(transactions);
  const [selectedTab, setSelectedTab] = useState('all');

  console.log({ transactions });

  const groupCounts = useMemo(
    () =>
      statusGroups.map((group) => ({
        ...group,
        count: transactions.filter(group.filter).length,
      })),
    [transactions],
  );

  const {
    currentData,
    currentPage,
    jump,
    maxPage,
    next,
    prev,
    rowsPerPage,
    handleRowsPerPage,
  } = usePagination(filteredData);

  useEffect(() => {
    const filterData = () => {
      const filteredLinks = transactions.filter((transaction) => {
        const matchesTab =
          selectedTab === 'all' || transaction.status === selectedTab;
        if (!searchQuery && matchesTab) return true;
        const lowercasedQuery = searchQuery.toLowerCase();
        return (
          matchesTab &&
          (transaction.business?.toLowerCase().includes(lowercasedQuery) ||
            transaction.receivedAmount?.toString().includes(lowercasedQuery) ||
            transaction.blockchain?.toLowerCase().includes(lowercasedQuery) ||
            transaction.client?.toLowerCase().includes(lowercasedQuery) ||
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
          <h1 className="text-xl font-medium">All volume transactions</h1>
          <div className="flex flex-wrap items-center gap-2">
            <Searchbar
              placeholder="Search by Client, Blockchain, Date, Time"
              className="w-fit border border-input bg-background"
              onChange={handleSearch}
              value={searchQuery}
            />
            <Link href="/volume/create" scroll={false}>
              <Button className="font-light" size="sm">
                Create transaction
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
              />
            </TabsContent>
          ))}
        </Tabs>
        <CustomPagination
          currentPage={currentPage}
          jump={jump}
          maxPage={maxPage}
          next={next}
          prev={prev}
          withRowsPerPage={true}
          rowsPerPage={rowsPerPage}
          handleRowsPerPage={handleRowsPerPage}
        />
      </Container>
    </div>
  );
}
