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

const tdClassName = 'px-2 py-4';
const thClassName = 'px-2 font-light font-semibold';

export default function Page() {
  return (
    <div className="flex h-full flex-col gap-2">
      <Container className="flex h-full w-full flex-col px-6 py-8">
        <h1 className="mb-10 text-xl font-medium">Withdrawals</h1>
        <table className="w-full">
          <thead className="h-10 border-b px-4">
            <tr className="text-left text-xs text-gray-400">
              <th className={thClassName}>Name</th>
              <th className={thClassName}>Amount</th>
              <th className={thClassName}>Date</th>
              <th className={thClassName}>Status</th>
            </tr>
          </thead>
          <tbody className="w-full">
            {WITHDRAWALS.map((withdrawal, index) => (
              <tr key={index} className="border-b text-sm font-semibold">
                <td className={tdClassName}>
                  <div className="flex items-center gap-5">
                    <WithdrawTypeIcon type={withdrawal.types} />
                    <div className="flex flex-col">
                      <span>{withdrawal.name}</span>
                      <span className="text-xs text-gray-400">
                        {withdrawal.id}
                      </span>
                    </div>
                  </div>
                </td>
                <td className={tdClassName}>
                  {formatCurrency(withdrawal.amount)} {withdrawal.symbol}
                </td>
                <td className={tdClassName}>{formatDate(withdrawal.date)}</td>
                <td
                  className={cn(tdClassName, {
                    'text-success': withdrawal.status === STATUSES.Completed,
                  })}
                >
                  {withdrawal.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Container>
    </div>
  );
}
