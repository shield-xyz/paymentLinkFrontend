'use client';

import { format, parseISO } from 'date-fns';
import { useMemo } from 'react';
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import CustomTooltip from './CustomTooltip';

const Chart = ({ transactions }) => {
  const processData = (transactions) => {
    const sortedTransactions = transactions.sort((a, b) =>
      a.date.localeCompare(b.date),
    );
    const groupedByDay = {};
    let cumulativeSum = 0; // Initialize a variable to keep track of the cumulative sum

    sortedTransactions.forEach((transaction) => {
      const day = format(parseISO(transaction.date), 'yyyy-MM-dd');
      if (!groupedByDay[day]) {
        groupedByDay[day] = cumulativeSum; // Start with the current cumulative sum
      }
      cumulativeSum += transaction.usdValue; // Add the current transaction's value to the cumulative sum
      groupedByDay[day] += transaction.usdValue; // Add to the day's sum
    });

    return Object.entries(groupedByDay).map(([name, amt]) => ({
      name,
      amt,
    }));
  };

  const data = useMemo(() => processData(transactions), [transactions]);

  console.log({ data });
  console.log({ transactions });
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 10,
          right: 0,
          left: 0,
          bottom: 0,
        }}
      >
        <XAxis
          dataKey="name"
          color="#6F767E"
          stroke="#6F767E"
          tickLine={false}
          type="category"
        />
        <YAxis type="number" hide={false} />
        <Tooltip
          content={(props) => (
            <CustomTooltip
              active={props.active}
              payload={props.payload}
              label={props.label}
            />
          )}
          cursor={{ fill: 'transparent' }}
        />
        <Area
          type="monotone"
          dataKey="amt"
          stroke="#0C68E9"
          fill="rgba(12, 104, 233, 0.1)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default Chart;
