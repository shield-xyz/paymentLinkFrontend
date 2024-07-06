'use client';

import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

import CustomTooltip from './CustomTooltip';

const data = [
  {
    name: 'Oct',
    uv: 1700,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Nov',
    uv: 1800,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Dec',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Jan',
    uv: 600,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Feb',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Mar',
    uv: 2100,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Apr',
    uv: 1800,
    pv: 3800,
    amt: 2500,
  },
];

const Chart = () => {
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
