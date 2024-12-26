import { motion } from 'framer-motion';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Sector } from 'recharts';
import { useState } from 'react';

const tokenomicsData = [
  { name: 'Public Sale', value: 10, color: '#7FFFD4' }, // Aquamarine
  { name: 'Private Sale', value: 15, color: '#98FB98' }, // Pale Green
  { name: 'Team & Advisors', value: 15, color: '#87CEEB' }, // Sky Blue
  { name: 'Ecosystem Growth', value: 20, color: '#40E0D0' }, // Turquoise
  { name: 'Community & Airdrop', value: 10, color: '#48D1CC' }, // Medium Turquoise
  { name: 'Staking & Yield Farming', value: 15, color: '#00CED1' }, // Dark Turquoise
  { name: 'Liquidity', value: 10, color: '#5F9EA0' }, // Cadet Blue
  { name: 'Reserves', value: 5, color: '#4682B4' }, // Steel Blue
];

// Render active shape when a sector is hovered/clicked
const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, value } = props;

  return (
    <g>
      <text
        x={cx}
        y={cy}
        dy={-20}
        textAnchor="middle"
        fill="#fff"
        className="text-lg font-medium"
      >
        {payload.name}
      </text>
      <text
        x={cx}
        y={cy}
        dy={20}
        textAnchor="middle"
        fill="#fff"
        className="text-2xl font-bold"
      >
        {value}%
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={Number(outerRadius) + 10}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  );
};

export default function LandingTokenomics() {
  const [activeIndex, setActiveIndex] = useState<number | undefined>();

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(undefined);
  };

  return (
    <section className="py-24 bg-secondary relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-neutral mb-4">Tokenomics</h2>
          <p className="text-neutral/70 max-w-2xl mx-auto">
            $SPIN token distribution and allocation
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Chart */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="h-[400px] w-full"
          >
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <PieChart>
                <Pie
                  activeIndex={activeIndex}
                  activeShape={renderActiveShape}
                  data={tokenomicsData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={150}
                  fill="#8884d8"
                  dataKey="value"
                  onMouseEnter={onPieEnter}
                  onMouseLeave={onPieLeave}
                  onClick={(_, index) => setActiveIndex(index)}
                >
                  {tokenomicsData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Legend
                  layout="vertical"
                  align="right"
                  verticalAlign="middle"
                  formatter={(value) => <span className="text-neutral/80">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {tokenomicsData.map((item, index) => (
              <div
                key={item.name}
                className={`flex items-center gap-4 p-4 rounded-lg transition-colors duration-300 cursor-pointer
                  ${
                    activeIndex === index ? 'bg-white/20 shadow-lg' : 'bg-white/5 hover:bg-white/10'
                  }`}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(undefined)}
                onClick={() => setActiveIndex(index)}
              >
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <div className="flex-1">
                  <h3 className="text-neutral font-medium">{item.name}</h3>
                </div>
                <div className="text-neutral/80 font-bold">{item.value}%</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
