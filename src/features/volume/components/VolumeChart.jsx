import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import CustomTooltip from '@/components/Recharts/CustomTooltip';

// Helper function to format timestamp and value
const processData = (data) => {
  const groupedByWeek = data.reduce((acc, item) => {
    const date = new Date(item.block_timestamp);
    const startOfWeek = new Date(
      date.setDate(date.getDate() - date.getDay()),
    ).toLocaleDateString();
    if (!acc[startOfWeek]) {
      acc[startOfWeek] = 0;
    }
    acc[startOfWeek] += item.value / Math.pow(10, item.token_info.decimals);
    return acc;
  }, {});

  return Object.entries(groupedByWeek).map(([name, amt]) => ({
    name, // Week start date
    amt, // Sum of amounts for the week
  }));
};

const VolumeChart = ({ transactions }) => {
  const data = processData(transactions); // Process data before rendering

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 10,
          right: 0,
          left: 20,
          bottom: 0,
        }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          horizontal={true}
          vertical={false}
        />

        <XAxis dataKey="name" stroke="#6F767E" tickLine={true} />
        <YAxis
          type="number"
          hide={false}
          domain={[0, 'dataMax']}
          ticks={[25000, 50000, 75000, 100000, 125000]}
          tickFormatter={(value) => `${value.toLocaleString()}`}
        />
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
          dot={{ stroke: '#0C68E9', strokeWidth: 2, fill: '#0C68E9' }} // Customize the dot appearance here
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default VolumeChart;
