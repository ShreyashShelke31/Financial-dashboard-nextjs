'use client';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';

export default function MonthlyMISChart({ months, equity, debt, hybrid }: { months: string[]; equity: number[]; debt: number[]; hybrid: number[]; }) {
  const data = months.map((m, i) => ({ name: m, equity: equity[i] ?? 0, debt: debt[i] ?? 0, hybrid: hybrid[i] ?? 0 }));
  return (
    <div className="card p-4 h-[360px]">
      <div className="font-medium mb-2">Monthly MIS</div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="equity" />
          <Line type="monotone" dataKey="debt" />
          <Line type="monotone" dataKey="hybrid" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
