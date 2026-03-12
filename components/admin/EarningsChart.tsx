'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { month: 'Jan', earnings: 320000 },
  { month: 'Feb', earnings: 480000 },
  { month: 'Mar', earnings: 390000 },
  { month: 'Apr', earnings: 560000 },
  { month: 'May', earnings: 720000 },
  { month: 'Jun', earnings: 650000 },
  { month: 'Jul', earnings: 880000 },
  { month: 'Aug', earnings: 760000 },
  { month: 'Sep', earnings: 920000 },
  { month: 'Oct', earnings: 1050000 },
  { month: 'Nov', earnings: 980000 },
  { month: 'Dec', earnings: 1200000 },
];

const formatYAxis = (v: number) =>
  v >= 1_000_000 ? `₦${(v / 1_000_000).toFixed(1)}M` : `₦${(v / 1000).toFixed(0)}K`;

export default function EarningsChart() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="font-bold text-gray-800 mb-6">Monthly Earnings (2024)</h3>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
          <defs>
            <linearGradient id="earningsGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#1a3c6e" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#1a3c6e" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} />
          <YAxis tickFormatter={formatYAxis} tick={{ fontSize: 11 }} width={70} />
          <Tooltip
            formatter={(v: number) => [`₦${v.toLocaleString('en-NG')}`, 'Earnings']}
          />
          <Area
            type="monotone"
            dataKey="earnings"
            stroke="#1a3c6e"
            strokeWidth={2}
            fill="url(#earningsGrad)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
