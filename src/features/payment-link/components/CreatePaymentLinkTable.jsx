import Link from 'next/link';

import { Icons } from '@/components';
import { Badge } from '@/components/Bage';
import { Card } from '@/components/Card';
import CustomTable from '@/components/CustomTable';
import SearchBar from '@/components/Searchbar';
import { Button } from '@/components/ui/button';
import Container from '@/components/ui/container';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  PAYMENT_DESCRIPTIONS,
  PAYMENT_STATUSES,
  formatCurrency,
  formatDate,
} from '@/lib/utils';

const PaymentLinks = [
  {
    name: 'EZE LLC',
    nameShort: 'AM',
    id: '9467656911',
    status: PAYMENT_STATUSES.Paid,
    description: PAYMENT_DESCRIPTIONS.Annual_Membership,
    currency: 'USD',
    amount: 10288.96,
    date: '2024-05-16',
  },
  {
    nameShort: 'AM',
    id: '9467656912',
    status: PAYMENT_STATUSES.Paid,
    description: PAYMENT_DESCRIPTIONS.Annual_Membership,
    currency: 'USD',
    amount: 10288.96,
    date: '2024-05-16',
  },
  {
    nameShort: 'AM',
    id: '9467656913',
    status: PAYMENT_STATUSES.Paid,
    description: PAYMENT_DESCRIPTIONS.Annual_Membership,
    currency: 'USD',
    amount: 10288.96,
    date: '2024-05-16',
  },
  {
    nameShort: 'AM',
    id: '9467656914',
    status: PAYMENT_STATUSES.Paid,
    description: PAYMENT_DESCRIPTIONS.Annual_Membership,
    currency: 'USD',
    amount: 10288.96,
    date: '2024-05-16',
  },
  {
    nameShort: 'AM',
    id: '9467656915',
    status: PAYMENT_STATUSES.Paid,
    description: PAYMENT_DESCRIPTIONS.Annual_Membership,
    currency: 'USD',
    amount: 10288.96,
    date: '2024-05-16',
  },
  {
    nameShort: 'AM',
    id: '9467656916',
    status: PAYMENT_STATUSES.Paid,
    description: PAYMENT_DESCRIPTIONS.Annual_Membership,
    currency: 'USD',
    amount: 10288.96,
    date: '2024-05-16',
  },
];

export function CreatePaymentLinkTable() {
  const headers = [
    { key: 'name', title: 'Name', className: 'px-2 font-light font-semibold' },
    {
      key: 'amount',
      title: 'Amount',
      className: 'px-2 font-light font-semibold',
    },
    {
      key: 'currency',
      title: 'Currency',
      className: 'px-2 font-light font-semibold',
    },
    {
      key: 'status',
      title: 'Status',
      className: 'px-2 font-light font-semibold',
    },
    { key: 'date', title: 'Date', className: 'px-2 font-light font-semibold' },
    {
      key: 'actions',
      title: 'Actions',
      className: 'px-2 font-light font-semibold',
    },
  ];

  const cellRenderers = {
    name: ({ row }) => (
      <div className="flex items-center gap-5">
        <Card type="light" className="flex items-center gap-2">
          <span>{row.nameShort}</span>
        </Card>
        <span className="font-medium">{row.description}</span>
      </div>
    ),
    amount: ({ row }) => {
      return (
        <span className="font-light">{formatCurrency(row.amount || 0)}</span>
      );
    },
    currency: ({ row }) => <span className="font-light">{row.currency}</span>,
    status: ({ row }) => (
      <Badge
        variant={row.status === PAYMENT_STATUSES.Paid ? 'success' : 'danger'}
      >
        {row.status}
      </Badge>
    ),
    date: ({ row }) => (
      <span className="font-light">{formatDate(row.date)}</span>
    ),
    actions: () => (
      <div className="flex items-center gap-2">
        <Button variant="ghost" className="px-2 py-2 font-light">
          <Icons.edit className="h-5 text-gray-500" />
        </Button>
        <Button variant="ghost" className="px-2 py-2 font-light">
          <Icons.share className="h-5 text-gray-500" />
        </Button>
      </div>
    ),
  };

  return (
    <div className="flex h-full flex-col gap-2">
      <Container className="flex h-full w-full flex-col px-6 py-8">
        <div className="mb-10 flex items-center justify-between">
          <h1 className="text-xl font-medium">All Payment Links</h1>
          <div className="flex items-center gap-2">
            <SearchBar
              placeholder="Search by Date, Time, Status"
              className="w-fit border bg-background"
            />
            <Button variant="outline" className="gap-2 px-4 py-2 font-light">
              <Icons.filter className="h-5 text-gray-500" />
              Filter
            </Button>
            <Link href="/create-payment-link">
              <Button className="px-4 py-2 font-light">
                Create payment link
              </Button>
            </Link>
          </div>
        </div>
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="all">
              All <span className="ml-1 text-muted-foreground">(20)</span>
            </TabsTrigger>
            <TabsTrigger value="paid">Paid</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="expired">Expired</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <CustomTable
              headers={headers}
              rows={PaymentLinks}
              rowKey="id"
              cellRenderers={cellRenderers}
            />
          </TabsContent>
          <TabsContent value="paid">
            <CustomTable
              headers={headers}
              rows={PaymentLinks}
              rowKey="id"
              cellRenderers={cellRenderers}
            />
          </TabsContent>
          <TabsContent value="pending">
            <CustomTable
              headers={headers}
              rows={PaymentLinks}
              rowKey="id"
              cellRenderers={cellRenderers}
            />
          </TabsContent>
          <TabsContent value="expired">
            <CustomTable
              headers={headers}
              rows={PaymentLinks}
              rowKey="id"
              cellRenderers={cellRenderers}
            />
          </TabsContent>
        </Tabs>
      </Container>
    </div>
  );
}
