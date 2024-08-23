import React from 'react'
import CustomDropdown from '@/utils/CustomDropdown'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const GraphComponent = ({ setDropdownValues, dropdownValues }) => {
  const options = [{ name: "Today" }, { name: "Yesterday" }, { name: "Last 7 days" }, { name: "Last 30 days" }]
  const data = [
    { name: '00hr', ADE: 100 },
    { name: '02hr', ADE: 200 },
    { name: '04hr', ADE: 300 },
    { name: '06hr', ADE: 400 },
    { name: '08hr', ADE: 500 },
    { name: '10hr', ADE: 400 },
    { name: '12hr', ADE: 700 },
    { name: '14hr', ADE: 800 },
    { name: '16hr', ADE: 900 },
    { name: '18hr', ADE: 950 },
    { name: '20hr', ADE: 880 },
    { name: '24hr', ADE: 988 },
  ];

  const formatYAxisTick = (tick) => {
    return `AED ${tick.toLocaleString()}`;
  };

  const CustomXAxisTick = ({ x, y, payload }) => {
    return (
      <text x={x} y={y + 20} textAnchor="middle" fill="#000000">
        {payload.value}
      </text>
    );
  };

  const CustomYAxisTick = ({ x, y, payload }) => {
    return (
      <text x={x - 10} y={y} textAnchor="end" fill="#000000">
        AED {payload.value}
      </text>
    );
  };

  const CustomActiveDot = (props) => {
    const { cx, cy, stroke, fill } = props;

    return (
      <circle
        cx={cx}
        cy={cy}
        r={10}
        stroke={"#A01E5D"}
        strokeWidth={5}
        fill={"#ffff"}

      />
    );
  };

  // Custom Tooltip Component
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const value = payload[0].value;
      return (
        <div style={{
          backgroundColor: '#fff',
          filter: "drop-shadow(0px 10px 32px rgba(31, 47, 70, 0.12))",
          borderRadius: '4px',
          padding: '6px 10px',
          fontSize: '16px',
          fontWeight: '700',
          color: '#000'
        }}>
          <p style={{ margin: 0 }}>{`${value.toLocaleString()}`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <div className='bg-white rounded-[6px]'>
      <div className='px-5 pt-5'>
        <div className='flex justify-between items-center'>
          <div className='flex items-center gap-2.5'>
            <h1 className='text-xl text-primary font-bold'>Revenue</h1>
            <p className='text-sm leading-[17px] text-primary font-medium'>
              AED 600 <span className='text-light'>(5 Orders)</span>
            </p>
          </div>
          <div className='max-w-[120px] w-full'>
            <CustomDropdown 
              selectFirst={true} 
              setDropdownValues={setDropdownValues} 
              dropdownValues={dropdownValues} 
              options={options} 
              searchBy={"name"} 
              fieldName="revenue_filter" 
            />
          </div>
        </div>

        <div className='w-full mt-[27px]'>
          <ResponsiveContainer width="100%" height={230}>
            <AreaChart
              data={data}
              syncId="anyId"
              margin={{
                top: 20,
                right: 10,
                left: 30,
                bottom: 20,
              }}
            >
              <defs>
                <linearGradient id="gradientColor" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="5%" style={{ stopColor: '#A01E5D', stopOpacity: 0.5 }} />
                  <stop offset="95%" style={{ stopColor: '#A01E5D', stopOpacity: 0.1 }} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#201A181A"
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={<CustomXAxisTick />} // Apply custom X axis tick
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tickFormatter={formatYAxisTick}
                tick={<CustomYAxisTick />} // Apply custom Y axis tick
              />
              <Tooltip content={<CustomTooltip />} /> {/* Use the custom tooltip */}
              <Area
                type="monotone"
                dataKey="ADE"
                stroke="#A01E5D"
                strokeWidth={2}
                fill="url(#gradientColor)"
                dot={false}
                activeDot={<CustomActiveDot />}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default GraphComponent
