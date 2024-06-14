import CustomTable from '@/components/CustomTable';
import Container from '@/components/ui/container';
import { WithdrawTypeIcon } from '@/features/withdraw';
import { STATUSES, TYPES, cn, formatCurrency, formatDate } from '@/lib/utils';

const WITHDRAWALS = [
  {
    name: 'EZE LLC',
    id: '9467656911',
    status: STATUSES.Completed,
    symbol: 'USD',
    amount: 10288.96,
    types: TYPES.Deposit,
    date: '2024-05-16',
  },
  {
    name: 'EZE LLC',
    id: '9467656912',
    status: STATUSES.Completed,
    symbol: 'USD',
    amount: 10288.96,
    types: TYPES.Withdrawal,
    date: '2024-05-16',
  },
  {
    name: 'EZE LLC',
    id: '9467656913',
    status: STATUSES.Completed,
    symbol: 'USD',
    amount: 10288.96,
    types: TYPES.Deposit,
    date: '2024-05-16',
  },
  {
    name: 'EZE LLC',
    id: '9467656914',
    status: STATUSES.Completed,
    symbol: 'USD',
    amount: 10288.96,
    types: TYPES.Deposit,
    date: '2024-05-16',
  },
  {
    name: 'EZE LLC',
    id: '9467656915',
    status: STATUSES.Completed,
    symbol: 'USD',
    amount: 10288.96,
    types: TYPES.Deposit,
    date: '2024-05-16',
  },
  {
    name: 'EZE LLC',
    id: '9467656916',
    status: STATUSES.Completed,
    symbol: 'USD',
    amount: 10288.96,
    types: TYPES.Withdrawal,
    date: '2024-05-16',
  },
];

export default function Page() {
  const headers = [
    { key: 'name', title: 'Name', className: 'px-2 font-light font-semibold' },
    {
      key: 'amount',
      title: 'Amount',
      className: 'px-2 font-light font-semibold',
    },
    { key: 'date', title: 'Date', className: 'px-2 font-light font-semibold' },
    {
      key: 'status',
      title: 'Status',
      className: 'px-2 font-light font-semibold',
    },
  ];

  const cellRenderers = {
    name: ({ row }) => (
      <div className="flex items-center gap-5">
        <WithdrawTypeIcon type={row.types} />
        <div className="flex flex-col">
          <span>{row.name}</span>
          <span className="text-xs text-gray-400">{row.id}</span>
        </div>
      </div>
    ),
    amount: ({ row }) => {
      return (
        <span>
          {formatCurrency(row.amount || 0)} {row.symbol}
        </span>
      );
    },
    date: ({ row }) => <span>{formatDate(row.date)}</span>,
    status: ({ row }) => (
      <span
        className={cn({
          'text-success': row.status === STATUSES.Completed,
        })}
      >
        {row.status}
      </span>
    ),
  };

  return (
    <div className="flex h-full flex-col gap-2">
      <Container className="flex h-full w-full flex-col px-6 py-8">
        <h1 className="mb-10 text-xl font-medium">Transactions</h1>
        <CustomTable
          headers={headers}
          rows={WITHDRAWALS}
          rowKey="id"
          cellRenderers={cellRenderers}
        />
      </Container>
    </div>
  );
}
