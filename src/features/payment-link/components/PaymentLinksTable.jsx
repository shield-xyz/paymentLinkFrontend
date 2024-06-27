'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

import { copyCode, getFinalPaymentLink } from '../utils';

import { CustomPagination, Icons } from '@/components';
import { Badge } from '@/components/Bage';
import CustomTable from '@/components/CustomTable';
import FilterDropDown from '@/components/FilterDropDown';
import Searchbar from '@/components/Searchbar';
import { Button } from '@/components/ui/button';
import Container from '@/components/ui/container';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePagination } from '@/hooks';
import { PAYMENT_STATUSES, formatAmount, formatDate } from '@/lib/utils';

const headers = [
  {
    key: 'name',
    title: 'Name',
    className: 'px-2 min-w-[200px] font-light font-semibold',
  },
  {
    key: 'amount',
    title: 'Amount',
    className: 'px-2 min-w-[100px] font-light font-semibold',
  },
  {
    key: 'currency',
    title: 'Currency',
    className: 'px-2 min-w-[100px] font-light font-semibold',
  },
  {
    key: 'status',
    title: 'Status',
    className: 'px-2 min-w-[100px] font-light font-semibold',
  },
  {
    key: 'date',
    title: 'Date',
    className: 'px-2 min-w-[120px] font-light font-semibold',
  },
  {
    key: 'actions',
    title: 'Actions',
    className: 'px-2 min-w-[100px] font-light font-semibold',
  },
];

const statusGroups = [
  { label: 'All', value: 'all', filter: () => true },
  {
    label: 'Paid',
    value: PAYMENT_STATUSES.Paid,
    filter: (link) => link.status === PAYMENT_STATUSES.Paid,
  },
  {
    label: 'Pending',
    value: PAYMENT_STATUSES.Pending,
    filter: (link) => link.status === PAYMENT_STATUSES.Pending,
  },
  {
    label: 'Paused',
    value: PAYMENT_STATUSES.Paused,
    filter: (link) => link.status === PAYMENT_STATUSES.Paused,
  },
  {
    label: 'Expired',
    value: PAYMENT_STATUSES.Expired,
    filter: (link) => link.status === PAYMENT_STATUSES.Expired,
  },
];

const cellRenderers = {
  name: ({ row }) => (
    <div className="flex w-full items-center gap-5">
      <span className="font-medium">{row.name}</span>
    </div>
  ),
  amount: ({ row }) => {
    console.log({ row });
    return (
      <span className="font-light">
        {row.asset?.decimals
          ? formatAmount(row.amount, row.asset?.decimals)
          : row.amount}
      </span>
    );
  },
  currency: ({ row }) => <span className="font-light">{row.token}</span>,
  status: ({ row }) => <Badge variant={row.status}>{row.status}</Badge>,
  date: ({ row }) => <span className="font-light">{formatDate(row.date)}</span>,
  actions: ({ row }) => {
    const link = getFinalPaymentLink(row.id);
    return (
      <div className="flex items-center gap-2">
        <Button variant="ghost" className="px-2 py-2 font-light">
          <Icons.edit className="h-5 text-gray-500" />
        </Button>
        <Button
          variant="ghost"
          className="px-2 py-2 font-light"
          onClick={() => copyCode(link, 'Link copied to clipboard')}
        >
          <Icons.share className="h-5 text-gray-500" />
        </Button>
      </div>
    );
  },
};

export function PaymentLinksTable({ paymentLinks }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(paymentLinks);
  const [selectedTab, setSelectedTab] = useState('all');

  const groupCounts = useMemo(
    () =>
      statusGroups.map((group) => ({
        ...group,
        count: paymentLinks.filter(group.filter).length,
      })),
    [paymentLinks],
  );

  const itemsPerPage = 5;

  const { currentData, currentPage, jump, maxPage, next, prev } = usePagination(
    filteredData,
    itemsPerPage,
  );

  useEffect(() => {
    const filterData = () => {
      const filteredLinks = paymentLinks.filter((link) => {
        const matchesTab = selectedTab === 'all' || link.status === selectedTab;
        if (!searchQuery && matchesTab) return true;
        const lowercasedQuery = searchQuery.toLowerCase();
        return (
          matchesTab &&
          (link.name.toLowerCase().includes(lowercasedQuery) ||
            link.status.toLowerCase().includes(lowercasedQuery) ||
            formatDate(link.date).toLowerCase().includes(lowercasedQuery))
        );
      });
      setFilteredData(filteredLinks);
    };

    filterData();
  }, [paymentLinks, searchQuery, selectedTab]);

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
          <h1 className="text-xl font-medium">All Payment Links</h1>
          <div className="flex flex-wrap items-center gap-2">
            <Searchbar
              placeholder="Search by Date, Time, Status"
              className="w-fit border border-input bg-background"
              onChange={handleSearch}
              value={searchQuery}
            />
            {/* <Button variant="outline" className="gap-2 font-light" size="sm">
              <Icons.filter className="h-5 text-gray-500" />
              Filter
            </Button> */}
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
          maxPage={maxPage}
          jump={jump}
          prev={prev}
          next={next}
        />
      </Container>
    </div>
  );
}
