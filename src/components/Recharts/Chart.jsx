'use client';

import { format, parseISO } from 'date-fns';
import { useMemo } from 'react';
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

import CustomTooltip from './CustomTooltip';

const Chart = ({ transactions }) => {
  const processData = (transactions) => {
    const groupedByDay = {};

    transactions.forEach((transaction) => {
      const day = format(parseISO(transaction.date), 'yyyy-MM-dd');
      if (!groupedByDay[day]) {
        groupedByDay[day] = 0;
      }
      groupedByDay[day] += transaction.amount * transaction.usdValue;
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
        />
        <YAxis hide={true} />
        <CustomTooltip
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
          dataKey="uv"
          stroke="#0C68E9"
          fill="rgba(12, 104, 233, 0.1)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default Chart;
