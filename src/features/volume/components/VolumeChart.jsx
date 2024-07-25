import {
  Area,
  AreaChart,
  CartesianGrid,
  Label,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import CustomTooltip from '@/components/Recharts/CustomTooltip';
import { formatCurrency } from '@/lib/utils';

const processData = (transactions) => {
  const transactionsFrom = transactions.filter(
    (transaction) => new Date(transaction.date) > new Date('2024-03-25'),
  );
  const groupedByWeek = transactionsFrom.reduce(
    (acc, { date, totalReceivedAmount }) => {
      const dateObj = new Date(date);
      const dayOfWeek = dateObj.getDay(); // Get day of week (0 for Sunday, 6 for Saturday)
      const startOfWeek = new Date(dateObj);
      startOfWeek.setDate(
        dateObj.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1),
      ); // Adjust to Monday as the first day of the week
      startOfWeek.setHours(0, 0, 0, 0); // Normalize to start of the day

      // Format the start of the week as "MM-DD-YYYY"
      const weekKey = `${(startOfWeek.getMonth() + 1).toString().padStart(2, '0')}/${startOfWeek.getDate().toString().padStart(2, '0')}/${startOfWeek.getFullYear()}`;

      if (!acc[weekKey]) {
        acc[weekKey] = 0;
      }
      acc[weekKey] += totalReceivedAmount;
      return acc;
    },
    {},
  );

  return Object.entries(groupedByWeek).map(([name, amt]) => ({
    name, // Week start date in "MM-DD-YYYY" format
    amt, // Sum of amounts for the week
  }));
};

const VolumeChart = ({ transactions }) => {
  const data = processData(transactions);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 10,
          right: 10,
          left: 80,
          bottom: 100,
        }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          horizontal={true}
          vertical={false}
          stroke="#6F767E"
        />
        <XAxis
          dataKey="name"
          stroke="#6F767E"
          tickLine={true}
          angle={-45}
          tickMargin={35}
          dx={-35}
          fontSize={15}
          style={{ fill: '#FFFFFF' }}
        >
          <Label
            value="Date"
            position="insideBottom"
            style={{ textAnchor: 'middle', fill: '#FFFFFF' }}
            dy={80}
          />
        </XAxis>
        <YAxis
          type="number"
          hide={false}
          domain={[0, 'dataMax']}
          ticks={[25000, 50000, 75000, 100000, 125000]}
          tickFormatter={(value) => `${formatCurrency(value, 0)}`}
          fontSize={15}
          style={{ fill: '#FFFFFF' }}
        >
          <Label
            value="Total Received"
            angle={-90}
            position="insideLeft"
            style={{ textAnchor: 'middle', fill: '#FFFFFF' }}
            dx={-50}
          />
        </YAxis>
        <Tooltip
          content={(props) => (
            <CustomTooltip
              active={props.active}
              payload={props.payload}
              label={props.label}
              dateClassName={'text-white'}
            />
          )}
          cursor={{ fill: 'transparent' }}
        />
        <Area
          type="monotone"
          dataKey="amt"
          stroke="#0C68E9"
          fill="rgba(12, 104, 233, 0.1)"
          dot={{ stroke: '#0C68E9', strokeWidth: 2, fill: '#0C68E9' }} // Customize the dot appearance here
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default VolumeChart;
